import express from 'express'
import {
	sendEmails,
	getEmails,
	getEmail,
	setEmailArchived,
	deleteEmail,
} from '../controllers/emailController.js'
import { verifyAuth } from '../middleware/verifyAuth.js'

export const emailRouter = express.Router()
// POST /emails
// req.body-ში გადაეცემა recipients, subject და body, სადაც recipients მძიმით გამოყოფილი იმეილების string-ია.
// ქმნის ახალ იმეილს და აბრუნებს ახალი იმეილის საჭირო ატრიბუტებს.
emailRouter.post('/', verifyAuth, sendEmails)

// GET /emails/c/:emailCategory
// path-ში დინამიურ სეგმენტად გადაეცემა emailCategory. აბრუნებს გადაცემულ კატეგორიაში შენახულ იმეილებს.
// Inbox კატეგორიის მითითებისას ყველა ისეთი იმეილი უნდა დაბრუნდეს, რომელიც არ არის archived.
// დანარჩენი კატეგორიები სახელების მიხედვით.ეს endpoint უნდა აბრუნებდეს სორტირებულ იმეილებს - უახლესი იმეილები დასაწყისში.
emailRouter.get('/c/:emailCategory', verifyAuth, getEmails)

// GET /emails/:emailId
// path-ში დინამიურ სეგმენტად გადაეცემა emailId. აბრუნებს შესაბამის იმეილს.
emailRouter.get('/:emailId', verifyAuth, getEmail)

// PATCH /emails/:emailId
// path-ში დინამიურ სეგმენტად გადაეცემა emailId. req.body-ში გადაეცემა archived - true ან false.
// ეს არის იმეილის დაარქივების endpoint.archived პარამეტრის მიხედვით უნდა განაახლოთ იმეილი და დააბრუნოთ განახლებული იმეილის საჭირო ატრიბუტები.
emailRouter.patch('/:emailId', verifyAuth, setEmailArchived)

// DELETE /emails/:emailId
emailRouter.delete('/:emailId', verifyAuth, deleteEmail)

// მნიშვნელოვანია: იმეილის დაბრუნებამდე/შეცვლამდე აუცილებლად შეამოწმეთ არის თუ არა ავტორიზებული მომხმარებელი გამოგზავნი/მიმღები მომხმარებლების სიაში.
// სხვის ანგარიშში დამატებული იმეილის წაკითხვა / დაარქივება მომხმარებელს არ უნდა შეეძლოს.
