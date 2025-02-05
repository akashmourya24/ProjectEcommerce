import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper, Link, Grid } from '@mui/material';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  name: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<LoginForm>({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
  };

  return (
    <Container 
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: '#fff',
      }}
    >
      {/* Left side - Image */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: { md: '60%' },
          backgroundImage: 'url("https://i.pinimg.com/736x/d4/49/b9/d449b9540821ad4e8a08b0fe18a7bb42.jpg")', // You can replace this with your own image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // backgroundColor: 'rgba(102, 126, 234, 0.6)', // This creates the blue overlay
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              textAlign: 'center',
              padding: 4,
            }}
          >
            Welcome to Our Store
          </Typography>
        </Box>
      </Box>

      {/* Right side - Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '40%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, #f5f7ff 0%, #f5f7ff 100%)',
          position: { md: 'fixed' },
          right: 0,
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          boxShadow: { md: '-4px 0 10px rgba(0, 0, 0, 0.1)' },
        }}
      >
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: '500px',
            borderRadius: '16px',
            background: 'transparent',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 700,
              color: '#333',
              mb: 2
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography 
            variant="body1" 
            gutterBottom 
            align="center" 
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {isLogin ? 'Please sign in to continue' : 'Sign up to get started'}
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                InputProps={{
                  startAdornment: <User size={20} style={{ marginRight: '8px', color: '#666' }} />,
                }}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Email or Phone Number"
              variant="outlined"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
              InputProps={{
                startAdornment: <Mail size={20} style={{ marginRight: '8px', color: '#666' }} />,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: <Lock size={20} style={{ marginRight: '8px', color: '#666' }} />,
              }}
              sx={{ mb: 2 }}
            />
            {!isLogin && (
              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                InputProps={{
                  startAdornment: <Lock size={20} style={{ marginRight: '8px', color: '#666' }} />,
                }}
                sx={{ mb: 2 }}
              />
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: '8px',
                backgroundColor: '#667eea',
                '&:hover': {
                  backgroundColor: '#764ba2',
                },
                transition: 'background-color 0.3s ease',
              }}
              onClick={() => navigate('/')}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsLogin(!isLogin)}
                  sx={{
                    color: '#667eea',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#764ba2',
                    },
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
