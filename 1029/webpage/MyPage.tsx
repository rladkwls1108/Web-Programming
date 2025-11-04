import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser, getProducts, getUserFavorites, deleteProduct, updateUser } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

const MyPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  const [myProducts, setMyProducts] = useState(getProducts().filter(p => p.userId === currentUser?.id));
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState(getProducts().filter(p => favoriteProductIds.includes(p.id)));
  
  const [nickname, setNickname] = useState(currentUser?.nickname || "");
  const [school, setSchool] = useState(currentUser?.school || "");

  useEffect(() => {
    if (!currentUser) {
      toast({
        title: "로그인이 필요합니다",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const favIds = getUserFavorites(currentUser.id);
    setFavoriteProductIds(favIds);
    setFavoriteProducts(getProducts().filter(p => favIds.includes(p.id)));
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const sellingCount = myProducts.filter(p => p.status === '판매중').length;
  const soldCount = myProducts.filter(p => p.status === '판매완료').length;

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteProduct(id);
      setMyProducts(getProducts().filter(p => p.userId === currentUser.id));
      toast({ title: "상품이 삭제되었습니다" });
    }
  };

  const handleSaveProfile = () => {
    updateUser(currentUser.id, { nickname, school });
    toast({ title: "프로필이 수정되었습니다" });
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-5xl">
              👤
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{currentUser.nickname}</h1>
              <p className="text-lg mb-2">📍 {currentUser.school}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2">{currentUser.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm mt-2 opacity-90">
                가입일: {formatDate(currentUser.createdAt)}
              </p>
            </div>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white">
              프로필 수정
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{sellingCount}</div>
            <div className="text-muted-foreground">판매 중</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{soldCount}</div>
            <div className="text-muted-foreground">판매 완료</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{favoriteProducts.length}</div>
            <div className="text-muted-foreground">찜한 상품</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="products">내가 올린 상품</TabsTrigger>
            <TabsTrigger value="favorites">찜한 상품</TabsTrigger>
            <TabsTrigger value="edit">프로필 편집</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {myProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {myProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        수정
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-xl text-muted-foreground mb-4">
                  등록한 상품이 없습니다
                </p>
                <Button onClick={() => navigate('/register')}>
                  상품 등록하기
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-xl text-muted-foreground mb-4">
                  찜한 상품이 없습니다
                </p>
                <Button onClick={() => navigate('/products')}>
                  상품 둘러보기
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="edit">
            <Card className="p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">프로필 편집</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">프로필 사진</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-4xl">
                      👤
                    </div>
                    <Button variant="outline">사진 변경</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">닉네임</label>
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">학교</label>
                  <Input
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">이메일</label>
                  <Input value={currentUser.email} disabled />
                  <p className="text-sm text-muted-foreground mt-1">
                    이메일은 변경할 수 없습니다
                  </p>
                </div>

                <Button size="lg" className="w-full" onClick={handleSaveProfile}>
                  저장
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPage;
