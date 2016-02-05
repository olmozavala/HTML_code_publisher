% % Only for testing
% close all;
% clear all;
% clc;
% N = 5;

function T = LegenPoly(N)
%% This function returns all the Legendre polynomials from 0 to N

syms x; 
syms T;

T(1) = 1;
T(2) = x;

for k=3:N
    n = k-2;
    T(k) = ((2*n + 1)*x*T(k-1) - n*T(k-2))/(n+1);
end 
