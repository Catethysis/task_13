//Таблица факторионов

/*
Нужно найти числа, равные сумме факториалов своих цифр.

Ограничимся рассмотрением десятичной системы счисления.

В условии просят вывести список всех чисел, из чего делаем вывод что множество этих чисел конечно. Оценим его границы!
Нижняя граница: факториал в обычном смысле не определён на отрицательном луче. Значит, возьмём за нижнюю границу ноль.
Верхняя граница:
для числа summ(10^i*a[i]; i=0..n) сумма факториалов цифр будет равна summ(a[i]!; i=0..n). Рассмотрим предел этой суммы.
Пускай a[i]=9. Получаем максимальное число длины n - что-то вроде 99 или 999999. Сумма факториалов равна n*9!=362880*n, 
само число будет равно 10^(n+1)-1. Очевидно, степенная функция растёт быстрее линейной, значит множество действительно
имеет предел. Неравенство 10^(n+1)-1<362880*n будет проще решить с помощью JS. Однако можно подумать перед вычислениями. 
Слегка упростим неравенство, облегчив левое условие (добавив единицу). Получим 10^n<36288*n. В переводе на человеческий 
язык - нужно найти такое число 36288*n, в записи которого меньше n знаков. В записи числа 36288 5 знаков, а даже n = 10
увеличит его всего до 6 знаков. Значит, n - около 6 или меньше. Так и есть, 36288*6 = 217728 - шесть знаков; 3622*5 = 
181440 - 5 знаков. Значит, n = 5. Тем не менее, проверим это функцией на JS.


Применим основной принцип динамического программирования - не станем снова вычислять то, что уже вычислено; используем
его и для таблицы факториалов, и для массива перебираемых чисел.
*/

base=10;
factorTable=[]; //таблица факториалов.

fillFactors=function() {
	//Заполним таблицу факториалов.
	factor=[];
	factor[0]=1; //из определения факториала
	for(var i=1;i<base;i++) factor[i]=factor[i-1]*i;
	return factor;
}

findUpLimit=function() {
	var n_limit=0; //максимальное количество цифр в числе
	var ten_powers=base; //вспомогательная переменная, степени десятки.
	while((ten_powers*=base)<factorTable[9]/base*(++n_limit));
	return n_limit;
}

numbers=[];

number=function(j,k,curLevel,maxLevel) {
	new_k=j+''+k;
	numbers[new_k]=factorTable[j]+(k==''?0:numbers[k]); k=new_k;
	if(curLevel<maxLevel) for(var i=0;i<=9;i++) number(i,k,curLevel+1,maxLevel);
}

factorTable=fillFactors();
limit=findUpLimit();
number('','',0,limit);

//console.log(numbers.length);

for(i in numbers) if(numbers[i]==i) console.log(i);