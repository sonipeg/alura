// Declaración de variables
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const copyBtn = document.getElementById('copyBtn');

// Clave secreta para el cifrado
const secretKey = 'mySecretKey12345';

// Función de validación
function validateText(text) {
    const regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(text);
}

// Función de encriptado
function encryptText(text) {
    if (!validateText(text)) {
        alert('No se aceptan caracteres especiales.');
        return '';
    }
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Función de desencriptado
function decryptText(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Evento de encriptar
encryptBtn.addEventListener('click', () => {
    const text = inputText.value;
    const encrypted = encryptText(text);
    outputText.style.display = 'block';
    outputText.textContent = encrypted;
    copyBtn.style.display = 'inline-block';
});

// Evento de desencriptar
decryptBtn.addEventListener('click', () => {
    const cipherText = inputText.value;
    const decrypted = decryptText(cipherText);
    outputText.style.display = 'block';
    outputText.textContent = decrypted;
    copyBtn.style.display = 'inline-block';
});

// Función de copiar al portapapeles
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.textContent).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
});

// Cambiar el color de los botones a rojo al cargar la página
window.onload = () => {
    encryptBtn.style.backgroundColor = '#FF0000';
    decryptBtn.style.backgroundColor = '#FF0000';
    copyBtn.style.backgroundColor = '#FF0000';
};
