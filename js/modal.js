async function sendToTelegram(data) {
	const BOT_TOKEN = '8767379398:AAEyi0rbTx_NSkQbOsegJaeSyzIXauKagzA'
	const CHAT_ID = '7693683752'

	const message = `
	✈️ New application Let's Fly ✈️

	👤 Name: ${data.name}

	✉️ Email: ${data.email}

	⏰ Time: ${new Date(data.timestamp).toLocaleString('ru-RU')}
	`

	try {
		const response = await fetch(
			`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		if (response.ok) {
			alert('Application sent successfully')
		} else {
			alert('Error sending application')
		}
	} catch (e) {
		console.error(e)
		alert('Error network')
	}
}

const modal = document.getElementById('modal')
const overlay = modal.querySelector('.modal__overlay')

const openButton = document.getElementById('open-modal-button')
const closeButton = document.getElementById('close-modal-button')

const form = document.getElementById('application-form')

function openModal() {
	modal.classList.add('modal--active')
	document.body.style.overflow = 'hidden'

	setTimeout(() => {
		form.querySelector('input[type="text"]').focus()
	}, 300)
}

function closeModal() {
	modal.classList.remove('modal--active')
	document.body.style.overflow = ''
	form.reset()
}

async function handleSubmit(e) {
	e.preventDefault()

	const name = document.getElementById('name').value
	const email = document.getElementById('email').value

	const data = {
		name,
		email,
		timestamp: new Date().toISOString()
	}

	await sendToTelegram(data)

	setTimeout(() => {
		closeModal()
	}, 1500)
}

document.addEventListener('DOMContentLoaded', () => {
	openButton.addEventListener('click', openModal)
	closeButton.addEventListener('click', closeModal)
	overlay.addEventListener('click', closeModal)

	form.addEventListener('submit', handleSubmit)

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
			closeModal()
		}
	})
})
