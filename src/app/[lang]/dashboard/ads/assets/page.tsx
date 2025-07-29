"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Image as ImageIcon,
  Video,
  Upload,
  MoreVertical,
  Trash2,
  Download,
  Copy,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Données de test (à remplacer par l'API)
const images = [
  {
    id: "1",
    name: "Product Banner 1",
    url: "https://picsum.photos/400/300",
    type: "image",
    size: "1.2 MB",
    dimensions: "1200x800",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Summer Sale",
    url: "https://picsum.photos/400/300",
    type: "image",
    size: "800 KB",
    dimensions: "1000x600",
    createdAt: "2024-01-14",
  },
  // ... plus d'images
];

const videos = [
  {
    id: "1",
    name: "Product Demo",
    url: "https://example.com/video1.mp4",
    type: "video",
    size: "5.4 MB",
    duration: "0:30",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Brand Story",
    url: "https://example.com/video2.mp4",
    type: "video",
    size: "12.8 MB",
    duration: "1:15",
    createdAt: "2024-01-14",
  },
  // ... plus de vidéos
];

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("images");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const handleAssetSelect = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id)
        ? prev.filter((assetId) => assetId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    // Implémenter la logique de suppression
    console.log("Deleting asset:", id);
  };

  const handleDownload = (id: string) => {
    // Implémenter la logique de téléchargement
    console.log("Downloading asset:", id);
  };

  const handleCopyUrl = (id: string) => {
    // Implémenter la logique de copie d'URL
    console.log("Copying URL for asset:", id);
  };

  const renderAssetGrid = (assets: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="p-6 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-primary-100 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500">
            Drag and drop or click to upload
          </p>
        </Card>
      </motion.div>

      {/* Asset Cards */}
      {assets.map((asset, index) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`relative group cursor-pointer ${
              selectedAssets.includes(asset.id) ? "ring-2 ring-primary-100" : ""
            }`}
            onClick={() => handleAssetSelect(asset.id)}
          >
            {/* Preview */}
            <div className="aspect-video relative">
              {asset.type === "image" ? (
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-t-lg">
                  <Video className="h-12 w-12 text-gray-400" />
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{asset.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDownload(asset.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyUrl(asset.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(asset.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {asset.type === "image"
                  ? `${asset.dimensions} • ${asset.size}`
                  : `${asset.duration} • ${asset.size}`}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="images">
            <ImageIcon className="h-4 w-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="mt-6">
          {renderAssetGrid(images)}
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          {renderAssetGrid(videos)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
