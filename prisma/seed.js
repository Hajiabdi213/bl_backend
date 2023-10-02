import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function seed(){


  await prisma.user.deleteMany()
  await prisma.customer.deleteMany()

  // creating users

    await prisma.user.create({
        data: 
          {
            firstname: 'Abdillahi',
            lastname: 'Osman',
            phone: '123-456-7891',
            role: true,
            isActive: true,
            email: 'Abdillahi@example.com',
            password: '123',
            picture: '',
          },
          
      });

    await prisma.user.create({
        data: 
          {
            firstname: 'Mohamed',
            lastname: 'Farah',
            phone: '123-456-7891',
            role: true,
            isActive: true,
            email: 'mohamed@example.com',
            password: '1234',
            picture: '',
          },
          
      });

    await prisma.user.create({
        data: 
          {
            firstname: 'Fatima',
            lastname: 'Mouse',
            phone: '123-456-7891',
            role: true,
            isActive: true,
            email: 'fatima@example.com',
            password: '12345',
            picture: '',
          },
          
      });



//Customers
await prisma.customer.create({
  data: 
    {
      firstname: 'Customer1',
      lastname: 'LastName1',
      address: 'Address 1',
      phoneNumber: '987-654-3211',
      email: 'customer1@example.com',
    }
  
});
await prisma.customer.create({
  data: 
    {
      firstname: 'Customer2',
      lastname: 'LastName1',
      address: 'Address 1',
      phoneNumber: '987-654-3211',
      email: 'customer2@example.com',
    }
  
});
await prisma.customer.create({
  data: 
    {
      firstname: 'Customer3',
      lastname: 'LastName1',
      address: 'Address 1',
      phoneNumber: '987-654-3211',
      email: 'customer3@example.com',
    }
  
});

}
seed();