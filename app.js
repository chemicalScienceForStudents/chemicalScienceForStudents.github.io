function sendEmail() {
    let mail=`mailto:chemicalscienceforstudents@gmail.com?subject=${businessEmail.value}&body=${emailContent.value}%0AMi correo de contacto es: ${contactEmail.value}`
    window.open(mail, '_blank');
}