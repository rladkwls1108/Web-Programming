import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProductById, getProducts, getCurrentUser, addFavorite, removeFavorite, isFavorite, incrementViews } from "@/lib/localStorage";
import { Heart, MapPin, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(getProductById(id!));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!product) {
      navigate('/products');
      return;
    }

    // 조회수 증가
    incrementViews(product.id);
    setProduct(getProductById(id!));

    // 찜 상태 확인
    if (currentUser) {
      setIsLiked(isFavorite(currentUser.id, product.id));
    }
  }, [id]);

  if (!product) return null;

  const relatedProducts = getProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleLike = () => {
    if (!currentUser) {
      toast({
        title: "로그인이 필요합니다",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (isLiked) {
      removeFavorite(currentUser.id, product.id);
      setIsLiked(false);
      toast({ title: "찜 목록에서 제거되었습니다" });
    } else {
      addFavorite(currentUser.id, product.id);
      setIsLiked(true);
      toast({ title: "찜 목록에 추가되었습니다" });
    }
  };

  const handleContact = () => {
    if (!currentUser) {
      toast({
        title: "로그인이 필요합니다",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    toast({ title: "문의 기능은 준비 중입니다" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '판매중':
        return 'bg-primary';
      case '예약중':
        return 'bg-accent';
      case '판매완료':
        return 'bg-muted';
      default:
        return 'bg-primary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Image Gallery */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl overflow-hidden mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                    currentImageIndex === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <Badge className={`mb-4 ${getStatusColor(product.status)}`}>
              {product.status}
            </Badge>
            
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <p className="text-4xl font-bold text-primary mb-6">
              {product.price.toLocaleString()}원
            </p>

            {/* Seller Info */}
            <Card className="p-4 mb-6 bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-medium">판매자</p>
                  <p className="text-sm text-muted-foreground">{product.school}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                판매자의 다른 상품 보기
              </Button>
            </Card>

            {/* Product Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">카테고리</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">상품 상태</span>
                <span className="font-medium">{product.condition}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">거래 방법</span>
                <span className="font-medium">{product.tradeMethod.join(', ')}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">거래 희망 장소</span>
                <span className="font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {product.location}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">등록일</span>
                <span className="font-medium">{formatDate(product.createdAt)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">조회수</span>
                <span className="font-medium flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {product.views}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleContact}
              >
                판매자에게 문의하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6"
                onClick={handleLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">상품 상세 설명</h2>
          <Card className="p-6">
            <p className="whitespace-pre-wrap text-foreground leading-relaxed">
              {product.description}
            </p>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">이런 상품은 어때요?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
