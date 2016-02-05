% close all;
% clear all;
% clc;
% 
% % f = 'sin(2.*x + 0.1*x.^3)'; % Function 
% f = '99*x.^2 + x.^3 - 2*x.^4 '; % Function
% a = 0;
% b = 2*pi; % Range of the interval [-L,L]
% terms = 15; % Max number of terms used in the series
% pts= 100;

function y_ps = PowerSeries(f,a,b,terms,pts)
    %% The power series are f(x) = a0 + a1(x-c)^1 + a2(x-c)^2 ... an(x-c)^n ...
        % This series become taylor series for smooth functions so an = f^(n)(c)/n!

    T = b-a; % This is the period of the function
    range = a: abs(T/pts) : b;
    c = a; % This is the constant of the series, I'm not sure how to select it

    % % Ploting the original graph
    % x = range;
    % y = eval(f);
    % plot(x,y);
    % grid;

    %% Computing coefficients in this case they are the same as Taylor series
    syms x; 
    coef(1) = eval(f);
    for ii=2:terms
        coef(ii) = diff(coef(ii-1),'x')/factorial(ii);
    end
    x = c;

    y_ps = zeros(1,length(range));
    ii = 1;

    % dx = abs(T/pts);   % This is for the normal Taylor series
    coef = (eval(coef)) % This is for the Power series

    for t = range
        if(ii==1)
            x = t;
            y_ps(1) = eval(f);
        else
            for k=1:terms % Evaluates the series for each point in x
                %             x = t - dx;  % Uncomment for Taylor
                %             y_ps(ii) = y_ps(ii) + eval(coef(k))*dx^(k-1); % Uncomment for Normal Taylor Series            
                y_ps(ii) = y_ps(ii) + coef(k)*t^(k-1);
            end
        end
        ii=ii+1;
    end

    % pause(.1);
    % plot(range,y);
    % hold on;
    % plot(range,y_ps,'r');
    % grid;
    % title(strcat('Num of terms: ',num2str(terms)));
    % hold off;
