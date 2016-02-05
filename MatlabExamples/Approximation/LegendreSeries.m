close all;
clear all;
clc;

% f = 'sin(2.*x + 0.1*x.^3)'; % Function     
% f = '99*x.^2 + x.^3 - 2*x.^4 '; % Function ( This is the one to test the algorithm)
% f = 'exp(x)'; % Function 
f = @HeavisideFunc;
a = -2;
b = 2; % Range of the interval 
terms = 3; % Max number of terms used in the series
pts= 100;

% function yCheb = ChebyshevSeries(f,a,b,terms,pts)

if(terms<3)
    display('ERROR we need at least 3 terms to work');
end    

T = b-a; % This is the domain of the function
range = a: abs(T/pts) : b;


% Ploting the original graph
x = range;
% y = eval(f);
y = feval(f,x); % When using the Heaviside function
plot(x,y);
grid;

syms x;

%% Computing Chebyshev polynomials
clear x;
syms x; 

c = zeros(1,terms); % This array will contain the coefficients
finalApp = 0;

T = LegenPoly(terms); % Obtains the first 'terms' chebycheb polynomials

for j=0:terms-1
    
    % Formula for coefficients from:
    % http://www.efunda.com/math/legendre/index.cfm

    % The next two lines is for normal interval -1, 1
%     c(j+1) =int(eval(f)*eval(T(j+1)),x,-1,1); % This is the correct way
%                                                   for text function
%     c(j+1) = int(-1*eval(T(j+1)),x,-1,1);

    % This formula is for the problem when f(x) [-2,2]
    c(j+1) = int(-1*eval(T(j+1)),x,-.5,.5);
    c(j+1) = (2*j+1)/2*c(j+1)
    
    % The following formula is difficult to analyze because it is symbolic
    finalApp = finalApp + c(j+1) * T(j+1);
end

finalApp = finalApp; % TODO we don't know C0

ii=1;
yLeg = zeros(1,length(range));
for xd = range
    x = xd/2;
    yLeg(ii) = eval(finalApp);
    ii = ii+1;
end

axis([-2 2 -2 2]);
hold on;
plot(range,yLeg,'or');
title(strcat('Num of terms: ',num2str(terms)));
legend('Original','Cheb App');
grid