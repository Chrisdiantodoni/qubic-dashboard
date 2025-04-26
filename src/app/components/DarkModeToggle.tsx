"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const [isChecked, setIsChecked] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    setIsChecked(currentTheme === "dark");
  }, []);

  const onThemeChanged = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setTheme(newChecked ? "dark" : "light");
  };

  return (
    <div className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 flex items-center space-x-2">
      <Switch
        id="dark-mode-toggle"
        checked={isChecked}
        onCheckedChange={onThemeChanged}
      />
      <Label
        htmlFor="dark-mode-toggle"
        className="text-sm text-gray-800 dark:text-gray-200"
      >
        {isChecked ? (
          <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </Label>
    </div>
  );
}
