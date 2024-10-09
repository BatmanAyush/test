'use client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!username) newErrors.username = 'Username is Required';
    if (!password) newErrors.password = 'Password is Required';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const userData = { username, password };
  
    try {
      const response = await axios.post('http://localhost:8081/login', userData);
      const token = response.data;
      
      // Save token to localStorage
      if (token) {
        localStorage.setItem('jwtToken', token); // Store JWT
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
  
        // Extract user role from token
        const userRole = decodedToken.role;
        console.log(decodedToken);
  
        // Check the role or any specific criteria, then navigate
        if (userRole) {
          if(userRole==='ADMIN'){navigate('/adash');}
          else if(userRole==='EMPLOYEE'){navigate('/edash');}
           // Navigate to landing page
        } else {
          setErrors({ login: 'Invalid role. Please try again.' });
        }
      } else {
        setErrors({ login: 'Invalid credentials. Please try again.' });
      }
  
    } catch (error) {
      console.log(error);
      setErrors({ login: 'Invalid credentials. Please try again.' });
    }
  };
  

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <CardDescription>Welcome back! Please login to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Username field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
              {errors.username && <span className="text-red-500">{errors.username}</span>}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            {errors.login && <span className="text-red-500">{errors.login}</span>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full cursor-pointer">Login</Button>
            <div className="text-sm text-center">
              Don't have an account?{' '}
              <Link to="/sign" className="text-primary hover:underline">
                Signup
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
