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
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Carnet digital cargado');
    loadStudentData();
    generateQRCode();
    initializeCardFlip();
});

// ==========================================
// CARGAR DATOS DEL ESTUDIANTE
// ==========================================
function loadStudentData() {
    try {
        const elements = {
            studentName: document.getElementById('studentName'),
            studentProgram: document.getElementById('studentProgram'),
            studentSemester: document.getElementById('studentSemester'),
            studentEmail: document.getElementById('studentEmail'),
            studentCC: document.getElementById('studentCC')
        };

        if (elements.studentName) elements.studentName.textContent = studentData.name;
        if (elements.studentProgram) elements.studentProgram.textContent = studentData.program;
        if (elements.studentSemester) elements.studentSemester.textContent = studentData.semester;
        if (elements.studentEmail) elements.studentEmail.textContent = studentData.email;
        if (elements.studentCC) elements.studentCC.textContent = studentData.cc;

        console.log('✅ Datos cargados correctamente');
    } catch (error) {
        console.error('❌ Error cargando datos:', error);
    }
}

// ==========================================
// GENERAR CÓDIGO QR
// ==========================================
function generateQRCode() {
    try {
        // Construir URL de verificación
        const baseURL = window.location.origin + window.location.pathname.replace(/[^\/]*$/, '');
        const verificationURL = baseURL + 'verify.html?id=' + encodeURIComponent(studentData.cc);
        
        console.log('📱 URL del QR:', verificationURL);
        
        const qrContainer = document.getElementById('qrCode');
        
        if (!qrContainer) {
            console.error('❌ No se encontró el contenedor del QR');
            return;
        }

        // Verificar que la librería QRCode esté disponible
        if (typeof QRCode === 'undefined') {
            console.error('❌ Librería QRCode no cargada');
            qrContainer.innerHTML = '<p style="color: #B22222; font-size: 12px; padding: 20px;">Error: Librería QR no disponible</p>';
            return;
        }
        
        // Generar QR usando la librería QRCode.js
        QRCode.toCanvas(
            verificationURL,
            {
                width: 200,
                margin: 2,
                color: {
                    dark: '#006633',
                    light: '#ffffff'
                },
                errorCorrectionLevel: 'M'
            },
            function (error, canvas) {
                if (error) {
                    console.error('❌ Error generando QR:', error);
                    qrContainer.innerHTML = '<p style="color: #B22222; font-size: 12px;">Error al generar QR</p>';
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
                    
                    setTimeout(function() {
                        canvas.style.opacity = '1';
                        canvas.style.transform = 'scale(1)';
                    }, 100);
                }
            }
        );
    } catch (error) {
        console.error('❌ Error en generateQRCode:', error);
    }
}

// ==========================================
// FUNCIONALIDAD DE VOLTEAR TARJETA
// ==========================================
function initializeCardFlip() {
    try {
        const card = document.getElementById('carnetCard');
        
        if (!card) {
            console.error('❌ No se encontró el elemento carnetCard');
            return;
        }
        
        console.log('✅ Flip inicializado correctamente');
        
        // Click para voltear
        card.addEventListener('click', function() {
            card.classList.toggle('is-flipped');
            console.log('🔄 Tarjeta volteada:', card.classList.contains('is-flipped'));
        });
        
        // Soporte para teclado (Enter y Espacio)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('is-flipped');
                console.log('🔄 Tarjeta volteada (teclado):', card.classList.contains('is-flipped'));
            }
        });
    } catch (error) {
        console.error('❌ Error inicializando flip:', error);
    }
}

// ==========================================
// FUNCIONES OPCIONALES
// ==========================================

// Función para agregar foto del estudiante
function loadStudentPhoto(imageURL) {
    try {
        const photoContainer = document.getElementById('fotoEstudiante');
        if (photoContainer) {
            photoContainer.src = imageURL;
            photoContainer.alt = 'Foto de ' + studentData.name;
            console.log('✅ Foto cargada:', imageURL);
        }
    } catch (error) {
        console.error('❌ Error cargando foto:', error);
    }
}

// Función para cargar logo de la universidad
function loadUniversityLogo(logoURL) {
    try {
        const logoContainer = document.getElementById('logoInstitucional');
        if (logoContainer) {
            logoContainer.src = logoURL;
            logoContainer.alt = 'Logo UAJS';
            console.log('✅ Logo cargado:', logoURL);
        }
    } catch (error) {
        console.error('❌ Error cargando logo:', error);
    }
}

// Función para actualizar semestre (útil para actualizaciones futuras)
function updateSemester(newSemester) {
    try {
        studentData.semester = newSemester;
        const semesterElement = document.getElementById('studentSemester');
        if (semesterElement) {
            semesterElement.textContent = newSemester;
        }
        console.log('✅ Semestre actualizado a:', newSemester);
    } catch (error) {
        console.error('❌ Error actualizando semestre:', error);
    }
}

// ==========================================
// NOTAS PARA IMPLEMENTACIÓN:
// ==========================================
/*
1. SUBIR A GITHUB PAGES:
   - Crea un repositorio en GitHub (ej: "carnet-digital")
   - Sube estos archivos: index.html, verify.html, styles.css, script.js
   - Ve a Settings > Pages > Source: main branch
   - Tu carnet estará en: https://TU-USUARIO.github.io/carnet-digital/

2. AGREGAR FOTO:
   - Sube tu foto como "foto.jpg" en el mismo directorio
   - Ya está configurada en el HTML

3. AGREGAR LOGO UAJS:
   - Sube el logo como "logo.png" en el mismo directorio
   - Ya está configurado en el HTML

4. PROBAR LOCALMENTE:
   - Usa un servidor local (python -m http.server 8000)
   - O abre directamente index.html en el navegador
   - El QR funcionará mejor en GitHub Pages

5. ACTUALIZAR DATOS:
   - Edita el objeto studentData al inicio de este archivo
   - Los cambios se reflejan automáticamente
*/

console.log('📄 Script cargado completamente');