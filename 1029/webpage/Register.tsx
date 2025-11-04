import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getCurrentUser, addProduct } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const categories = [
  "교재/전공서적",
  "전자기기",
  "생활용품/가구",
  "패션/의류",
  "기타",
];

const schools = [
  "경성대학교",
  "부경대학교",
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      toast({
        title: "로그인이 필요합니다",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("거의새것");
  const [tradeMethods, setTradeMethods] = useState<string[]>(["직거래"]);
  const [location, setLocation] = useState("");
  const [school, setSchool] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !price) {
      toast({
        title: "입력 오류",
        description: "모든 필수 항목을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();

    if (!school || !description) {
      toast({
        title: "입력 오류",
        description: "모든 필수 항목을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    if (tradeMethods.includes("직거래") && !location) {
      toast({
        title: "입력 오류",
        description: "거래 희망 장소를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    // 상품 등록
    addProduct({
      userId: currentUser!.id,
      title,
      description,
      price: parseInt(price),
      category,
      status: '판매중',
      condition: condition as '새것' | '거의새것' | '사용감있음',
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400'],
      school,
      tradeMethod: tradeMethods,
      location: location || school,
    });

    setStep(3);
  };

  const toggleTradeMethod = (method: string) => {
    setTradeMethods(prev =>
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 실제로는 이미지를 업로드하고 URL을 받아야 하지만, 데모이므로 샘플 이미지 사용
      const newImages = Array.from(files).slice(0, 5).map(() => 
        'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400'
      );
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">상품 등록</h1>

          {/* Progress */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">기본 정보</h2>
              <form onSubmit={handleStep1} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    상품 이미지 <span className="text-muted-foreground">(최대 5장)</span>
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        📷 사진을 최대 5장까지 추가하세요
                      </p>
                      <Button type="button" variant="outline">
                        이미지 선택
                      </Button>
                    </label>
                    {images.length > 0 && (
                      <div className="flex gap-2 mt-4 justify-center flex-wrap">
                        {images.map((img, i) => (
                          <img key={i} src={img} alt={`미리보기 ${i+1}`} className="w-20 h-20 object-cover rounded" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">제목 *</label>
                  <Input
                    placeholder="상품 제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">카테고리 *</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">가격 *</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="가격을 입력하세요"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      원
                    </span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  다음 단계
                </Button>
              </form>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">상세 정보</h2>
              <form onSubmit={handleStep2} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">상품 상태 *</label>
                  <RadioGroup value={condition} onValueChange={setCondition}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="새것" id="new" />
                      <Label htmlFor="new">새것</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="거의새것" id="almost-new" />
                      <Label htmlFor="almost-new">거의 새것</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="사용감있음" id="used" />
                      <Label htmlFor="used">사용감 있음</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">거래 방법 *</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="direct"
                        checked={tradeMethods.includes("직거래")}
                        onCheckedChange={() => toggleTradeMethod("직거래")}
                      />
                      <label htmlFor="direct">직거래</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="delivery"
                        checked={tradeMethods.includes("택배")}
                        onCheckedChange={() => toggleTradeMethod("택배")}
                      />
                      <label htmlFor="delivery">택배</label>
                    </div>
                  </div>
                </div>

                {tradeMethods.includes("직거래") && (
                  <div>
                    <label className="block text-sm font-medium mb-2">거래 희망 장소</label>
                    <Input
                      placeholder="예: 남구 대연동"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">학교 *</label>
                  <Select value={school} onValueChange={setSchool}>
                    <SelectTrigger>
                      <SelectValue placeholder="학교를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">상세 설명 *</label>
                  <Textarea
                    placeholder="상품에 대한 자세한 설명을 입력하세요"
                    rows={8}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    이전
                  </Button>
                  <Button type="submit" size="lg" className="flex-1">
                    등록하기
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-4">등록 완료!</h2>
              <p className="text-muted-foreground mb-8">
                상품이 성공적으로 등록되었습니다
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/mypage')}
                >
                  내 상품 보기
                </Button>
                <Button 
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  홈으로
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
