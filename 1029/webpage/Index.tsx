import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/lib/localStorage";
import { Search } from "lucide-react";

const categories = [
  { icon: "📚", name: "교재/전공서적", id: "교재/전공서적" },
  { icon: "💻", name: "전자기기", id: "전자기기" },
  { icon: "🏠", name: "생활용품/가구", id: "생활용품/가구" },
  { icon: "👕", name: "패션/의류", id: "패션/의류" },
  { icon: "🎮", name: "기타", id: "기타" },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const products = getProducts().slice(0, 8);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            대학생을 위한 안전한 거래
          </h1>
          <p className="text-xl mb-8 opacity-90">
            교재부터 생활용품까지, 캠퍼스에서 간편하게
          </p>
          
          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="원하는 상품을 검색해보세요"
                className="h-14 pl-12 text-base rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 h-14 px-8 rounded-full"
              onClick={handleSearch}
            >
              검색
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-card rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-2 hover:border-primary hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Products Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">최근 등록된 상품</h2>
            <Button 
              variant="outline"
              onClick={() => navigate('/products')}
            >
              전체보기
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
