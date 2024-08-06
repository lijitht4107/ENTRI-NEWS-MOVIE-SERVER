import express from 'express'
import { addEmployees, countByAge, countByAgeGreaterThan, employeesList, getEmployeesSortedByName } from '../Controllers/employeeController.js'

const employeeRouter = express.Router()

employeeRouter.post('/addemployees',addEmployees)
employeeRouter.get('/employeeslist',employeesList)
employeeRouter.get('/countbyage',countByAge)
employeeRouter.get('/countbyageGreaterThan/:age',countByAgeGreaterThan)
employeeRouter.get('/getEmployeesSortedByName',getEmployeesSortedByName)



export default employeeRouter