"use client"; // Add this line at the top

import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); // ✅ Added password
  const [cellphone, setCellphone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Handle file selection & preview
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form data
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Debugging: Ensure all fields have values
      console.log("Submitting Data:", { username, password, cellphone, dateOfBirth, photoFile });

      if (!username || !password || !cellphone || !dateOfBirth) {
        alert("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("username", username); 
      formData.append("password", password); // ✅ Added password
      formData.append("cellphone", cellphone);
      formData.append("dateOfBirth", dateOfBirth);
      if (photoFile) {
        formData.append("userImage", photoFile);
      }

      const res = await fetch("http://localhost:8080/api/voters/signup", { 
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data;
      try {
        if (res.headers.get("Content-Type")?.includes("application/json")) {
          data = JSON.parse(text);
        } else {
          data = { message: text };
        }
      } catch (error) {
        data = { message: text };
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to complete setup");
      }

      console.log("Setup Response:", data);
      router.push("/dashboard"); // Redirect to dashboard after success
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-8 px-8">
          <h1 className="text-3xl font-bold text-center">Complete your profile</h1>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-32 w-32">
                {photoPreview ? (
                  <Image src={photoPreview} alt="Profile preview" fill className="rounded-full object-cover" />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-gray-800">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              <Label htmlFor="photo" className="cursor-pointer bg-white px-4 py-2 text-black rounded-md">
                Upload photo
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* ✅ Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Cellphone Input */}
            <div className="space-y-2">
              <Label htmlFor="cellphone">Cellphone Number</Label>
              <Input
                id="cellphone"
                type="tel"
                placeholder="Enter your cellphone number"
                required
                className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </div>

            {/* Date of Birth Input */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                required
                className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-white text-black rounded-md" disabled={isLoading}>
              {isLoading ? "Completing setup..." : "Complete setup"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
