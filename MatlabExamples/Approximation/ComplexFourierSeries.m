% close all;
% clear all;
% clc;
% 
% f = 'sin(2.*x + 0.1*x.^3)'; % Function 
% a = 0;
% b = 2*pi; % Range of the interval [-L,L]
% totalterms = 10; % Max number of terms used in the series
% pts= 100;

function yf = ComplexFourierSeries(f,a,b,totalterms,pts)

terms = floor(totalterms);

T = b-a; % This is the period of the function
range = a: abs(T/pts) : b;

x = range;

% % Ploting the original graph
% y = eval(f);
% plot(x,y);
% grid;

syms x;

%% Computing coefficients in this case from -terms to terms
syms x; 
indx = 1;
for k=-terms:terms % Look formula in my pdf   
    g(indx) = (1/T) * double(int(eval(f)*exp(-i*2*pi*(k/T)*x),x,a,b)); % Computes definite integral  
    indx = indx + 1;
end

ii=1;
yf = zeros(1,length(range));
for x = range
    indx = 1;
    for k=-terms:terms % Evaluates the series for each point in x
        yf(ii) = yf(ii) + g(indx)* exp(i*2*pi*(k/T)*x);
        indx = indx + 1;
    end
    ii=ii+1;
end

% pause(.1);
% plot(range,y);
% hold on;
% plot(range,yf,'r');
% grid;
% title(strcat('Num of terms: ',num2str(terms)));
% hold off;