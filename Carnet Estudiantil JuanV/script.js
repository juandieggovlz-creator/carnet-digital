// ==========================================
// CONFIGURACIÓN DEL ESTUDIANTE
// ==========================================
const studentData = {
    name: "Juan Diego Vélez Mejía",
    cc: "1104254361",
    university: "Corporación Universitaria Antonio José de Sucre",
    location: "Sincelejo",
    program: "Ingeniería de Sistemas",
    semester: "4",
    email: "estudiante_juanvelezm@uajs.edu.co",
    code: "024100210",
    status: "Activo"
};

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 Carnet digital cargado');
    loadStudentData();
    generateQRCode();
    initializeCardFlip();
});

// ==========================================
// CARGAR DATOS DEL ESTUDIANTE
// ==========================================
function loadStudentData() {
    // No hay código estudiantil en el frente, solo estos datos
    const nameElement = document.getElementById('studentName');
    if (nameElement) nameElement.textContent = studentData.name;
    
    const programElement = document.getElementById('studentProgram');
    if (programElement) programElement.textContent = studentData.program;
    
    const semesterElement = document.getElementById('studentSemester');
    if (semesterElement) semesterElement.textContent = studentData.semester;
    
    const emailElement = document.getElementById('studentEmail');
    if (emailElement) emailElement.textContent = studentData.email;
    
    const ccElement = document.getElementById('studentCC');
    if (ccElement) ccElement.textContent = studentData.cc;
}

// ==========================================
// GENERAR CÓDIGO QR
// ==========================================
function generateQRCode() {
    // Construir URL de verificación
    // IMPORTANTE: Cambia 'verify.html' por 'view.html' si prefieres ese nombre
    const baseURL = window.location.origin + window.location.pathname.replace(/[^\/]*$/, '');
    const verificationURL = `${baseURL}verify.html?id=${encodeURIComponent(studentData.cc)}`;
    
    console.log('📱 URL del QR:', verificationURL);
    
    const qrContainer = document.getElementById('qrCode');
    
    if (!qrContainer) {
        console.error('❌ No se encontró el contenedor del QR');
        return;
    }
    
    // Generar QR usando la librería QRCode.js
    QRCode.toCanvas(
        verificationURL,
        {
            width: 200,
            margin: 2,
            color: {
                dark: '#006633',  // Color verde de la universidad
                light: '#ffffff'
            },
            errorCorrectionLevel: 'M'
        },
        function (error, canvas) {
            if (error) {
                console.error('❌ Error generando QR:', error);
                qrContainer.innerHTML = '<p style="color: #B22222; font-size: 14px;">Error al generar QR</p>';
            } else {
                qrContainer.innerHTML = '';
                canvas.style.width = '190px';
                canvas.style.height = '190px';
                qrContainer.appendChild(canvas);
                
                console.log('✅ QR generado correctamente');
                
                // Animación de aparición
                canvas.style.opacity = '0';
                canvas.style.transform = 'scale(0.8)';
                canvas.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    canvas.style.opacity = '1';
                    canvas.style.transform = 'scale(1)';
                }, 100);
            }
        }
    );
}odeURIComponent(studentData.cc)}`;
    
    const qrContainer = document.getElementById('qrCode');
    
    // Generar QR usando la librería QRCode.js
    QRCode.toCanvas(
        verificationURL,
        {
            width: 200,
            margin: 2,
            color: {
                dark: '#006633',  // Color verde de la universidad
                light: '#ffffff'
            },
            errorCorrectionLevel: 'M'
        },
        function (error, canvas) {
            if (error) {
                console.error('Error generando QR:', error);
                qrContainer.innerHTML = '<p style="color: #B22222; font-size: 14px;">Error al generar código QR</p>';
            } else {
                qrContainer.innerHTML = '';
                qrContainer.appendChild(canvas);
                
                // Animación de aparición
                canvas.style.opacity = '0';
                canvas.style.transform = 'scale(0.8)';
                canvas.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    canvas.style.opacity = '1';
                    canvas.style.transform = 'scale(1)';
                }, 100);
            }
        }
    );
}

// ==========================================
// FUNCIONALIDAD DE VOLTEAR TARJETA
// ==========================================
function initializeCardFlip() {
    const card = document.getElementById('carnetCard');
    
    if (!card) {
        console.error('❌ No se encontró el elemento carnetCard');
        return;
    }
    
    console.log('✅ Flip inicializado correctamente');
    
    // Click para voltear
    card.addEventListener('click', () => {
        toggleCardFlip();
    });
    
    // Soporte para teclado (Enter y Espacio)
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCardFlip();
        }
    });
}

function toggleCardFlip() {
    const card = document.getElementById('carnetCard');
    card.classList.toggle('is-flipped');
    console.log('🔄 Tarjeta volteada:', card.classList.contains('is-flipped'));
}

// ==========================================
// FUNCIONES OPCIONALES
// ==========================================

// Función para agregar foto del estudiante
function loadStudentPhoto(imageURL) {
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    const img = document.createElement('img');
    img.src = imageURL;
    img.alt = 'Foto de ' + studentData.name;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    photoPlaceholder.innerHTML = '';
    photoPlaceholder.appendChild(img);
}

// Función para cargar logo de la universidad
function loadUniversityLogo(logoURL) {
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    const img = document.createElement('img');
    img.src = logoURL;
    img.alt = 'Logo UAJS';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    logoPlaceholder.innerHTML = '';
    logoPlaceholder.appendChild(img);
}

// Función para actualizar semestre (útil para actualizaciones futuras)
function updateSemester(newSemester) {
    studentData.semester = newSemester;
    document.getElementById('studentSemester').textContent = newSemester;
    localStorage.setItem('studentSemester', newSemester);
}

// ==========================================
// EXPORTAR FUNCIONES (opcional)
// ==========================================
window.carnetAPI = {
    updateSemester,
    loadStudentPhoto,
    loadUniversityLogo,
    studentData
};

// ==========================================
// NOTAS PARA IMPLEMENTACIÓN:
// ==========================================
/*
1. SUBIR A GITHUB PAGES:
   - Crea un repositorio en GitHub (ej: "carnet-digital")
   - Sube estos archivos: index.html, styles.css, script.js
   - Ve a Settings > Pages > Source: main branch
   - Tu carnet estará en: https://TU-USUARIO.github.io/carnet-digital/

2. AGREGAR FOTO:
   - Sube tu foto como "photo.jpg" en el mismo directorio
   - Descomenta y usa: loadStudentPhoto('photo.jpg')

3. AGREGAR LOGO UAJS:
   - Consigue el logo oficial en formato PNG/SVG
   - Sube como "logo.png" en el mismo directorio
   - Descomenta y usa: loadUniversityLogo('logo.png')

4. CREAR view.html (PÁGINA DE VERIFICACIÓN):
   - Necesitas crear un archivo view.html que muestre los datos cuando escaneen el QR
   - Este archivo recibirá el parámetro ?id=CEDULA
   - Te lo proporcionaré a continuación

5. ACTUALIZAR DATOS:
   - Simplemente edita el objeto studentData en script.js
   - Puedes actualizar semestre, correo, etc.
   - Los cambios se reflejan automáticamente

6. SEGURIDAD:
   - El QR es público y cualquiera puede escanearlo
   - No incluyas información sensible adicional
   - Considera agregar un token de verificación si necesitas más seguridad

7. USO:
   - Abre index.html en tu navegador
   - Click para ver el QR en el reverso
   - El conductor escanea el QR
   - Se abre view.html con tus datos verificados
*/