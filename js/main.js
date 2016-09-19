/**
 * Created by SergST on 15.09.2016.
 */
'use strict';

$(function () {

	$('.start').click(function () {

		var searchStr = $('#search').val().trim();


		if (searchStr) {
			$('.wrapper-search').html('');
			$.ajax({
				url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAyMONPDO7l3sxN0kDoVtfq1w_' +
				'lW2fGQeY&cx=000629323765220375184:kukq2rjqi8q&q=' + searchStr,

				error: function (e) {
					console.log(e);
					alert('Сервер  не отвечает')
				},

				success: function (data) {
					console.log(data);
					render('#resultTmpl', data, '.wrapper-search');
				}
			})
		}
		else return
	});

	function render(id, obj, parent) {
		var tmpl = _.template($(id).html());
		var result = tmpl(obj);
		$(parent).append(result);
	}

	//Helpers

	var letters = 'abcdefghijklmnopqrstuvwxyz',
		lettersAmount = letters.length;

	function getRandomString(len) {
		var str = '',
			randomPosition = 0;
		while (str.length < len) {
			randomPosition = Math.floor(Math.random() * lettersAmount);
			str += letters.charAt(randomPosition);
		}
		return str.charAt(0).toUpperCase() + str.substr(1);
	}

	//генерация случайного целого числа из интервала мин-макс
	function randomInteger(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	}

	//Генерация случайного пола М или Ж
	function genderGenerator() {
		if (randomInteger(0, 1)) {
			return ('man');
		}
		return ('woman');
	}

	// наследование

	function Human(name, age, gender, height, weight) {
		this.name = name || getRandomString(10);
		this.age = age || randomInteger(15, 60);
		this.gender = gender || genderGenerator();
		this.height = height || randomInteger(150, 190);
		this.weight = weight || randomInteger(60, 100);
	}

	function Worker(name, age, gender, height, weight, job, salary) {
		Human.apply(this, arguments);
		this.job = job || 'webdev';
		this.salary = salary || 1000;
	}

	// наследуемся от Human
	Worker.prototype = Object.create(Human.prototype);
	// восстановим конструктор (переписался при наследовании)
	Worker.prototype.constructor = Worker;

	Worker.prototype.working = function () {
		console.log(this.name + " is working now!")
	};

	function Student(name, age, gender, height, weight, institution, grant) {
		Human.apply(this, arguments);
		this.institution = institution || 'KNU';
		this.grant = grant || 100;
	}

	// наследуемся от Human
	Student.prototype = Object.create(Human.prototype);
	// восстановим конструктор (переписался при наследовании)
	// Student.prototype.constructor = Student;

	Student.prototype.watchingSer = function () {
		console.log(this.name + " is watching series now!")
	};

	var work1 = new Worker();
	var work2 = new Worker();
	var work3 = new Worker('Tom');
	var stud1 = new Student();
	var stud2 = new Student();
	var stud3 = new Student("Nik");

	console.log(work1);
	console.log(work1.age);
	console.log(work2);
	console.log(work3);
	work3.working();
	console.log(stud1);
	console.log(stud2);
	console.log(stud3);
	stud3.watchingSer();

});

