import axios from 'axios';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

export default function AdminAdd() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent the default form submission behavior
    const newErrors: any = {};
    if (!username) newErrors.username = 'Name is Required';
    if (!email) newErrors.email = 'Email is Required';
    if (!password) newErrors.password = 'Password is Required';
    if (!country) newErrors.country = 'Country of origin is required';
    if (!role) newErrors.role = 'Select your Role';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      password,
      username,
      role
    };

    try {
      const response = await axios.post('http://localhost:8081/register', userData);
      console.log('user registered successfully:', response.data);

      // Redirect to the dashboard after successful registration
      navigate('/edash');

    } catch (error) {
      console.log(error);
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
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <CardDescription>Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Username field */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
              {errors.username && <span className="text-red-500">{errors.username}</span>}
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
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

            {/* Country select */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value: string) => setCountry(value)}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && <span className="text-red-500">{errors.country}</span>}
            </div>

            {/* Role select */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value: string) => setRole(value.toUpperCase())}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <span className="text-red-500">{errors.role}</span>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full cursor-pointer">Sign Up</Button>
            <div className="text-sm text-center">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
