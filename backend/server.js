import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(
	cors({
		origin: '*',
	})
)

// GET /user/status
// ამოწმებს მომხმარებლის loggedIn სტატუსს. თუ მომხმარებელი სისტემაში შესულია,
// აბრუნებს მომხმარებლის ძირითად ინფორმაციას(email, _id).
app.get('/user/status', () => {})

// POST /user/register
// req.body-ში გადაეცემა email და password. არეგისტრირებს მომხმარებელს, ამატებს მონაცემთა ბაზაში.
// დარეგისტრირების შემდეგ მომხმარებელი ჩათვალეთ სისტემაში შესულად.აბრუნებს მომხმარებლის ძირითად ინფორმაციას(email, _id).
app.post('/user/register', () => {})

// POST /user/login
// req.body-ში გადაეცემა email და password. მომხმარებელი შეყავს სისტემაში. აბრუნებს მომხმარებლის ძირითად ინფორმაციას (email, _id).
app.post('/user/login', () => {})

// DELETE /user/logout
// მომხმარებელი გამოყავს სისტემიდან.
app.delete('/user/logout', () => {})

// POST /emails
// req.body-ში გადაეცემა recipients, subject და body, სადაც recipients მძიმით გამოყოფილი იმეილების string-ია.
// ქმნის ახალ იმეილს და აბრუნებს ახალი იმეილის საჭირო ატრიბუტებს.
app.post('/emails', () => {})

// GET /emails/c/:emailCategory
// path-ში დინამიურ სეგმენტად გადაეცემა emailCategory. აბრუნებს გადაცემულ კატეგორიაში შენახულ იმეილებს.
// Inbox კატეგორიის მითითებისას ყველა ისეთი იმეილი უნდა დაბრუნდეს, რომელიც არ არის archived.
// დანარჩენი კატეგორიები სახელების მიხედვით.ეს endpoint უნდა აბრუნებდეს სორტირებულ იმეილებს - უახლესი იმეილები დასაწყისში.
app.get('/emails/c/:emailCategory', () => {})

// GET /emails/:emailId
// path-ში დინამიურ სეგმენტად გადაეცემა emailId. აბრუნებს შესაბამის იმეილს.
app.get('/emails/:emailId', () => {})

// PATCH /emails/:emailId
// path-ში დინამიურ სეგმენტად გადაეცემა emailId. req.body-ში გადაეცემა archived - true ან false.
// ეს არის იმეილის დაარქივების endpoint.archived პარამეტრის მიხედვით უნდა განაახლოთ იმეილი და დააბრუნოთ განახლებული იმეილის საჭირო ატრიბუტები.
app.patch('/emails/:emailId', () => {})

// მნიშვნელოვანია: იმეილის დაბრუნებამდე/შეცვლამდე აუცილებლად შეამოწმეთ არის თუ არა ავტორიზებული მომხმარებელი გამოგზავნი/მიმღები მომხმარებლების სიაში.
// სხვის ანგარიშში დამატებული იმეილის წაკითხვა / დაარქივება მომხმარებელს არ უნდა შეეძლოს.
