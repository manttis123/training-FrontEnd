var cvTest = {
	'nom' : 'Juan Perez',
	'about' : 'zaraza',
	'exp' : [
				{'Lugar' : 'Global Logic', 
				'Puesto' : 'Sopore Técnico', 
				'Período' : '2015/09-2016/04'},
			],
	'conocim' : ['JAVA', 'C', 'C++']
};


$.each(cvTest, function (variable, tipo){
	if (typeof tipo == 'string')
		$('#'+variable).html(tipo);
	else{
		var ul = $('<ul></ul>');

		$.each(tipo, function (subVariable, subTipo){
			if (typeof subTipo == 'string'){
				var li = $('<li></li>'); /* */ 
				li.html(subTipo);
				ul.append(li);
			}
			else{
				var h3 = $('<h3></h3>'); /* */ 
				var li1 = $('<li1></li1>'); /* */ 
				var li2 = $('<li2></li2>'); /* */ 
				
				h3.html(subTipo);
				li1.html(subTipo);
				li2.html(subTipo);
				ul.append(h3);
				ul.append(li1);
				ul.append(li2);
			}
		});
		$('#'+variable).html(ul);
	}	
});


