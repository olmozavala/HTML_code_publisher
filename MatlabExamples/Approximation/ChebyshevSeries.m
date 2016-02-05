% close all;
% clear all;
% clc;
% 
% f = 'sin(2.*x + 0.1*x.^3)'; % Function 
% % f = '99*x.^2 + x.^3 - 2*x.^4 '; % Function ( This is the one to test the algorithm)
% % f = 'exp(x)'; % Function 
% a = 0;
% b = 2*pi; % Range of the interval 
% terms = 5; % Max number of terms used in the series
% pts= 100;

function yCheb = ChebyshevSeries(f,a,b,terms,pts)

if(terms<3)
    display('ERROR we need at least 3 terms to work');
end    

T = b-a; % This is the domain of the function
range = a: abs(T/pts) : b;


% Ploting the original graph
x = range;
y = eval(f);
plot(x,y);
grid;

syms x;

%% Computing Chebyshev polynomials
clear x;
syms x; 

c = zeros(1,terms); % This array will contain the coefficients
finalApp = 0;

T = ChebPoly(terms); % Obtains the first 'terms' chebycheb polynomials

for j=0:terms-1
    
    % Formula for coefficients from:
    % http://mathworld.wolfram.com/ChebyshevApproximationFormula.html
    
    for k=1:terms %Computing the coefficients using the same number of terms
        x = cos( (pi*(k-.5)/terms) );
        c(j+1) = c(j+1) + eval(f)*cos( pi*j*(k-.5)/terms);
    end
    c(j+1) = (2/terms)*c(j+1);    
    
    % The following formula is difficult to analyze because it is symbolic
    finalApp = finalApp + c(j+1) * T(j+1);
end

finalApp = finalApp - (1/2)* c(1); % TODO we don't know C0

ii=1;
yCheb = zeros(1,length(range));
for x = range
    yCheb(ii) = eval(finalApp);
    ii = ii+1;
end

hold on;
plot(range,yCheb,'or');
title(strcat('Num of terms: ',num2str(terms)));
legend('Original','Cheb App');
grid