%% This file shows some examples using different methods for approximate a  function with a truncated series

function approximation()
    close all;
    clear all;
    clc;

    a = 0;
    b = 2*pi;
    pts = 200; % Number of points to evaluate x inside the range
    terms = 10; % Terms in the truncated series

    x = a:abs( (b-a)/pts):b;     % Period where the function is approximated
    funcs = {'-x.^2','sin(2.*x + 0.1*x.^3)'}; % Function 

    % Iterate over the functions to approximate
    for i = 1:length(funcs)
        f = funcs{i};
        % f = 'cos(2.*x + 0.1*x.^3)'; % Function 
        fprintf('Approximating function: %s \n',f);

        fh = plotOriginal(f,x,i,0);

        %% Approximating using fourier series %% ----------------
        fprintf('Approximating with Fourier Series...\n');
        f_FS = FourierSeries(f,2*pi,terms,length(x));
        plot(x, f_FS(ceil(length(f_FS)/2)+1:length(f_FS)),'or');

        fprintf('Approximating with complex Fourier Series...\n');
        f_FS = ComplexFourierSeries(f,a,b,terms,pts);
        plot(x, f_FS,'og');
        title(f);
        legend('Original', 'Fourier', 'Complex Fourier');
        saveas(fh,strcat('FurierApproximation_Ex_',num2str(i)),'png');

        %% Approximating using Chebysheb %% ----------------
        % Plot original function 
        fprintf('Approximating with ChebyshevSeries...\n');
        fc = plotOriginal(f,x,i,400);

        % Make approximation
        f_CB = ChebyshevSeries(f,a,b,terms,pts);
        plot(x, f_CB,'or');
        legend('Original', 'Chebyshev');
        title(f);
        saveas(fc,strcat('ChebyshevSeries_Ex_',num2str(i)),'png');

        %% Approximating using PowerSeries %% ----------------
        % Plot original function
        fprintf('Approximating with Power Series...\n');
        x = a:abs( (b-a)/pts):b;
        fh = plotOriginal(f,x,i,800);

        f_PS = PowerSeries(f,a,b,terms,pts);
        plot(x, f_PS,'or');
        legend('Original', 'Power Series');
        title(f);
        saveas(fh,strcat('PowerSeries_Ex_',num2str(i)),'png');
        pause(.1);
    end
end

function fg = plotOriginal(f,x,i,Xpos)
    fg = figure('Position',[Xpos 400*(i-1) 400 400]);
    plot(x, eval(f)); % Ploting real function
    hold on; pause(0.5);
end
