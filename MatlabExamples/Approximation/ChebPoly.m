function T = ChebPoly(n)

%% This function returns all the Chebycheb polynomials from 0 to K

syms x; 
syms T;

T(1) = 1;
T(2) = x;

for k=3:n
    T(k) = 2*x*T(k-1) - T(k-2);
end 
