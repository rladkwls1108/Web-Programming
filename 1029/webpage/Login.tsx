import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserByEmail, setCurrentUser } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "입력 오류",
        description: "이메일과 비밀번호를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    const user = getUserByEmail(email);
    
    if (!user) {
      toast({
        title: "로그인 실패",
        description: "존재하지 않는 계정입니다",
        variant: "destructive",
      });
      return;
    }

    // 실제로는 비밀번호 해시를 비교해야 하지만, localStorage 데모이므로 간단히 처리
    setCurrentUser(user.id);
    
    toast({
      title: "로그인 성공",
      description: `${user.nickname}님, 환영합니다!`,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">🎓 캠퍼스마켓</h1>
            <h2 className="text-2xl font-bold">로그인</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">비밀번호</label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm cursor-pointer">
                로그인 유지
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link to="#" className="block text-sm text-primary hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
            <div className="text-sm text-muted-foreground">
              계정이 없으신가요?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                회원가입
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
