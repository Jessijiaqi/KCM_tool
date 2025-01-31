import {
    BarChart3,
    ChevronDown,
    Download,
    FileText,
    Home as HomeIcon,
    Settings,
  } from "lucide-react";
  import React from "react";
  
  // 假设这些组件是你自己写/拷贝的，需要先确保这些路径可用
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  
  // 你的数据
  const navigationItems = [
    { icon: HomeIcon, label: "Home", active: true },
    { icon: FileText, label: "Fleet and Service Data" },
    { icon: BarChart3, label: "Simulation" },
    { icon: Settings, label: "Account" },
  ];
  
  const downloadItems = [
    { label: "Operational data", filename: "operation-sample.csv" },
    { label: "Base data", filename: "base-sample.csv" },
    { label: "Bus data", filename: "bus-sample.csv" },
  ];
  
  export default function Home() {
    return (
      <div className="relative min-h-screen bg-white rounded-lg overflow-hidden border-4 border-solid border-[#2d3648]">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-[#717d96] fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Logo" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span className="font-bold text-white">EcoRider</span>
          </div>
  
          <div className="flex items-center gap-4">
            <span className="font-bold text-white text-sm">King County Metro</span>
            <span className="text-white text-sm">Jane Doe</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
        </header>
  
        {/* Left Sidebar */}
        <aside className="fixed w-64 h-[calc(100vh-56px)] top-14 left-0 bg-wf-base200 border-r border-[#2d3648]">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-1">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    className={`flex items-center gap-2.5 px-6 py-3 w-full ${
                      item.active
                        ? "bg-wf-base300 text-[#2d3648]"
                        : "text-wf-base600"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </aside>
  
        {/* Main Content */}
        <main className="ml-64 pt-14 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-black mb-8 leading-8">
              Welcome to EcoRider, a zero emissions bus feasibility simulator!
              <br />
              It can help your fleet simulate the transition from diesel buses to
              zero emission buses.
              <br />
              To begin,
            </h1>
  
            <div className="space-y-6">
              {/* Step 1 */}
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Prepare File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#717d96]">
                    Download the example files and prepare your data:
                  </p>
  
                  {downloadItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-[#717d96]">{item.label}</span>
                      <FileText className="h-5 w-5 text-[#717d96]" />
                    </div>
                  ))}
  
                  <p className="text-[#717d96] font-medium">
                    You can download the sample file and prepare your data in this
                    format, you need to upload them during step 2.
                  </p>
  
                  {downloadItems.slice(0, 2).map((item, index) => (
                    <Button key={index} variant="outline" className="gap-2">
                      <Download className="h-5 w-5" />
                      <span className="text-xs underline">{item.filename}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
  
              {/* Step 2 */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Step 2: Input Current Fleet and Service Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#717d96]">
                    Input the data or file required in step 1 to generate current
                    fleet service
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#717d96]">
                      When you are ready preparing the cvs file, click this button
                      to continue
                    </p>
                    <Button
                      variant="outline"
                      className="w-[200px] border-2 border-wf-base800"
                    >
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
  
              {/* Step 3 */}
              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Zero Emissions Simulation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#717d96]">
                    Play with the variables to replace all the diesel bus into
                    electric bus.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#717d96]">
                      When you are ready preparing the fleet and service data,
                      click this button to continue
                    </p>
                    <Button
                      variant="outline"
                      className="w-[200px] border-2 border-wf-base800"
                    >
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }
  