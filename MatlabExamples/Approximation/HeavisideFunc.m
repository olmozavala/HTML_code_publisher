function y = HeavisideFunc(x)

if(length(x) == 1)
    if( abs(x) < 1)
        y = -1;
    else 
        if( abs(x) == 1)
            y = -.5;
        else
            y = 0;
        end
    end
else
    for i=1:length(x)
        y(i) = HeavisideFunc(x(i));
    end
end