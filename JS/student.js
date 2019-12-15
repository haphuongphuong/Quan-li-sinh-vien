function emailsValid(email){
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


function save(){
	let fullname = document.getElementById('Fullname').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	let address = document.getElementById('address').value;
	let gender = '';

	if (document.getElementById('male').checked){
		gender = document.getElementById('male').value;
	} else if (document.getElementById('female').checked){
		gender = document.getElementById('female').value;
	}
	
	if (_.isEmpty(fullname)) {
		document.getElementById('fullname-erro').innerHTML = 'Vui long nhap ho va ten';	
	} else if(fullname.trim().length <= 2){
		document.getElementById('fullname-erro').innerHTML = 'khong duoc nho hon 2 ki tu';	
		fullname = '';
	} else if(fullname.trim().length > 50 ){
		document.getElementById('fullname-erro').innerHTML = 'khong duoc lon hon 50 ki tu';	
		fullname ='';
	} else {
		document.getElementById('fullname-erro').innerHTML = '';
	}

	if (_.isEmpty(email)) {
		document.getElementById('email-erro').innerHTML = 'Vui long nhap Email';	
		email ='';
	} else if (!emailsValid(email)){
		document.getElementById('email-erro').innerHTML = 'Email khon dung dinh dang';
		email='';
	} else{
		document.getElementById('email-erro').innerHTML = '';
	}

	if (_.isEmpty(phone)) {
		document.getElementById('phone-erro').innerHTML = 'Vui long nhap SDT';
		phone='';
	} else if(phone.trim().length >10) {
		document.getElementById('phone-erro').innerHTML = 'SDT khong dung';
		phone='';
	} else {
		document.getElementById('phone-erro').innerHTML = '';
	}

	if (_.isEmpty(address)) {
		document.getElementById('address-erro').innerHTML = 'Vui long nhap dia chi';
		address ='';	
	} else{
		document.getElementById('address-erro').innerHTML = '';
	}

	if (_.isEmpty(gender)) {
		document.getElementById('gender-erro').innerHTML = 'Vui long chon gioi tinh';
		gender ='';
	}else{
		document.getElementById('gender-erro').innerHTML = '';
	}

	if(fullname && email && phone && address && gender){
		//Luu vao danh sach
		let students  = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
		students.push({
			fullname: fullname,
			email: email,
			phone: phone,
			address: address,
			gender: gender,
		});

		localStorage.setItem('students', JSON.stringify(students));

		this.renderListStudent()
		
	}
}

function renderListStudent(){
	let students  = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	if(students.length === 0){
		document.getElementById('list-student').style.display = 'none';
		return false;
	}
	document.getElementById('list-student').style.display = 'block';

	let tableContent = `<tr>
				<td width = '20'>#</td>
				<td>Full name</td>
				<td>Email</td>
				<td>Number Phone</td>
				<td>Gioi tinh</td>
				<td>Address</td>
				<td>Activities</td>
			</tr>`;

	students.forEach((student,index) => {
			let studentID = index;
			index++;
			let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nu';

			tableContent += `<tr>
				<td>${index}</td>
				<td>${student.fullname}</td>
				<td>${student.email}</td>
				<td>${student.phone}</td>
				<td>${genderLabel}</td>
				<td>${student.address}</td>
				<td>
					<a href='#'>Edit</a> | <a href='#' onclick="deleteStudent(${studentID})">Delete</a>
				</td>
			</tr>`
		})
	document.getElementById('grid-students').innerHTML = tableContent;
}

function deleteStudent(id){
	let students  = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	students.splice(id,1);

	localStorage.setItem('students', JSON.stringify(students));
	renderListStudent();
}