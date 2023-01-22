import { faker } from '@faker-js/faker';

export function generateUsers(maxLength, startFrom = 0) {
    return new Array(maxLength).fill(null).map((_, i) => {
        const personalInfo = {
            id: faker.random.numeric(10),
            name: faker.name.fullName(),
            email: faker.internet.email(),
            address: faker.address.cityName() + ", " + faker.address.streetAddress(),
            phoneNumber: faker.phone.number()
        }
        return {
            uid: i + 1 + startFrom,
            personalInfo,
            personalInfoOrig: personalInfo,
        }
    })
}
