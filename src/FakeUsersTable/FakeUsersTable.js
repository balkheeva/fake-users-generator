import {Table, Container} from "react-bootstrap";
import User from "../User/User";
import {useEffect, useState} from "react";
import {faker} from '@faker-js/faker';
import ToolBar from "../ToolBar/ToolBar";
import {generateUsers} from "../helpers/createUser";
import {createMistakes} from "../helpers/createMistakes";
import InfiniteScroll from "react-infinite-scroll-component";
import csvDownload from "json-to-csv-export";

export default function FakeUsersTable() {
    const [users, setUsers] = useState([])
    const [probability, setProbability] = useState(null)
    const [seed, setSeed] = useState(null)
    const [maxLength, setMaxLength] = useState(20)

    const dataToConvert = {
        data: users.map(user => user.personalInfo),
        filename: 'Fake_users',
        delimiter: ',',
        headers: ['id', "Name", "Email", "Address", "Phone number"]
    }
    const handleExportCSV = () => {
        csvDownload(dataToConvert)
    }

    useEffect(() => {
        createUser(probability)
    }, [probability, seed])

    const createUser = (withMistakes) => {
        if (seed == null || seed === '') faker.seed()
        else faker.seed(seed)
        let newUsers = generateUsers(maxLength, (seed != null ? (seed + 100) * 100 : 0))
        if (withMistakes) {
            newUsers = createMistakes(probability || 0, newUsers, seed)
        }
        setUsers(newUsers)
    }

    const handleProbability = (value) => {
        setProbability(value === '' ? null : Number(value))
    }

    const handleSeedChange = (value) => {
        setSeed(value === '' ? null : Number(value))
    }
    const fetchMoreData = (withMistakes) => {
        setTimeout(() => {
            let newUsers = generateUsers(10, users[users.length - 1]?.uid || 0)
            if (withMistakes) {
                newUsers = createMistakes(probability || 0, newUsers, seed)
            }
            setUsers(users.concat(newUsers));
            setMaxLength(maxLength + newUsers.length)
        }, 1500);
    };

    return <Container>
        <ToolBar
            onCreateUser={createUser}
            onChangeSeed={handleSeedChange}
            onEnterProbability={handleProbability}
            onExportCSV={handleExportCSV}
        />
        <InfiniteScroll
            next={() => fetchMoreData(probability)}
            hasMore={true}
            loader={<h4 className="m-1 text-center">Loading...</h4>}
            dataLength={users.length}
            height={900}
        >
            <Table responsive className="mt-3 table-striped">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone number</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <User user={user} index={index}/>
                    </tr>
                ))}
                </tbody>
            </Table>
        </InfiniteScroll>
    </Container>
}

