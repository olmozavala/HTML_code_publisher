% close all;
% clear all;
% clc;
% 
% f = 'sin(2.*x + 0.1*x.^3)'; % Function 
% L = 2*pi; % Range of the interval [-L,L]
% terms = 20; % Max number of terms used in the series
% pts= 100;
function yf = FourierSeries(f,L,terms,pts)

range = -L:L/pts:L;
x = range;

% % Ploting the original graph
% y = eval(f);
% plot(x,y);
% grid;

syms x;
% a coefficients
a0 = (1/L) * double(int(eval(f),x,-L,L));

%%Computing coefficients
for k=1:terms % Look formula in my pdf
    syms x;    

    a(k) = (1/L) * double(int(eval(f)*cos(k*pi*x/L),x,-L,L)); % Computes definite integral
    b(k) = (1/L) * double(int(eval(f)*sin(k*pi*x/L),x,-L,L)); % Computes definite integral   
end

i=1;
for x = range
    yf(i) = 1/2*a0;
    for k=1:terms % Evaluates the series for each point in x
        yf(i) = yf(i) + a(k)*cos(k*pi*x/L) + b(k)*sin(k*pi*x/L);
    end
    i=i+1;
end

% 
% pause(.1);
% plot(range,y);
% hold on;
% plot(range,yf,'r');
% grid;
% title(strcat('Num of terms: ',num2str(terms)));
% hold off;