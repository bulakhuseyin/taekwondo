
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleUpload = async () => {
    if (!videoFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await fetch("https://sinbad-yvgq.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Sunucudan geçerli yanıt alınamadı");

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analiz hatası:", error);
      alert("Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Taekwondo Müsabaka Analiz Aracı</h1>

      <Card className="mb-6">
        <CardContent className="space-y-4 p-4">
          <Input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files[0])} />
          <Button onClick={handleUpload} disabled={uploading || !videoFile}>
            {uploading ? "Analiz Ediliyor..." : "Videoyu Yükle ve Analiz Et"}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">Analiz Sonucu</h2>
            <p><strong>Toplam Tekme:</strong> {analysisResult.totalKicks}</p>
            <p><strong>Yorgunluk Başlangıcı:</strong> {analysisResult.fatigueStartMinute}. dakika</p>
            <p><strong>En Çok Kullanılan Teknik:</strong> {analysisResult.mostCommonTechnique}</p>
            <p><strong>En çok Puan Kaybı:</strong> {analysisResult.scoreLostFrom}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
