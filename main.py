# main.py
from flask import Flask, render_template, request, redirect, flash, url_for

app = Flask(__name__)
app.secret_key = 'una-clave-secreta-muy-segura' # Necesario para 'flash'

# Ruta principal que renderiza la página de inicio
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para procesar el formulario de contacto
@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        # Aquí puedes procesar los datos del formulario
        nombre = request.form['nombre']
        empresa = request.form['empresa']
        email = request.form['email']
        telefono = request.form['telefono']
        mensaje = request.form['mensaje']

        # En un proyecto real, aquí guardarías los datos en una base de datos,
        # enviarías un email, o los integrarías con un CRM.
        # Por ahora, solo los imprimimos en la consola para demostrar que funciona.
        print("="*30)
        print("NUEVO CONTACTO RECIBIDO")
        print(f"Nombre: {nombre}")
        print(f"Empresa: {empresa}")
        print(f"Email: {email}")
        print(f"Teléfono: {telefono}")
        print(f"Mensaje: {mensaje}")
        print("="*30)

        # Muestra un mensaje de éxito al usuario
        flash('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success')

        return redirect(url_for('index') + '#contacto')

if __name__ == '__main__':
    # El host '0.0.0.0' hace que sea accesible desde la red
    app.run(host='0.0.0.0', port=8080)
