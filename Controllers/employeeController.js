import Employee from '../models/employeeModel.js'

const addEmployees = async(req,res)=>{

    try {
        await Employee.create([

            { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },

            { name: 'William Riker', age: 29, rank: 'Commander' },

            { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },

            { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },

            { name: 'Worf', age: 24, rank: 'Lieutenant' }
        ])
        res.status(201).send("Employees added")
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const employeesList = async (req,res) => {

    try {
        const employeelist = await Employee.find()
        if (!employeelist) {

            res.status(404).json({error:"employees not get"})
        } else {
            res.status(200).json(employeelist)
            
        }
    } catch (error) {

         console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const countByAge = async (req,res) =>{
try {
    const records = await Employee.aggregate([
        {
            $group:
            {
               _id:"$age",
               count:{$sum:1} 
            }
        }

    ])
    res.status(200).json(records)
} catch (error) {
    console.log(error);
        res.status(500).json({error:"Internal server error"})
}

}

const countByAgeGreaterThan =async (req,res)=>{

    try {
        const age = Number(req.params.body)
        const records = await Employee.aggregate([
            {
                $match:
                {
                    age:{$gte:age}
                }
            },
            {
                $group:{
                    _id:"$age",
                    count:{$sum:1}
                }
            }
        ])
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const getEmployeesSortedByName =async(req,res)=>{
    try {
        const records= await Employee.aggregate([
            {$sort:{name:-1}},
            {$limit:4},
            {
                $project:{
                    _id:0,
                    EmployeeName:'$name',
                    rank:1
                }
            }
        ])
        res.status(200).json(records)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}

export {addEmployees,employeesList,countByAge,countByAgeGreaterThan,getEmployeesSortedByName}