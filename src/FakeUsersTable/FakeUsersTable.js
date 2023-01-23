import {Table, Form, Spinner, Container, Button, ButtonToolbar, Dropdown} from "react-bootstrap";
import User from "../User/User";
import {useEffect, useState} from "react";
import {faker} from '@faker-js/faker';
import ToolBar from "../ToolBar/ToolBar";
import {generateUsers} from "../helpers/createUser";
import {createMistakes} from "../helpers/createMistakes";
import InfiniteScroll from "react-infinite-scroll-component";
import {ExportToCsv} from "export-to-csv";


export default function FakeUsersTable() {
    const [users, setUsers] = useState([])
    const [probability, setProbability] = useState(null)
    const [seed, setSeed] = useState('')

    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'My Awesome CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    const handleExportCSV = () => {

        csvExporter.generateCsv(users.map(user => user.personalInfo));
    }

    useEffect(() => {
        if ((probability == null || probability === '') && !seed) {
            return;
        }
        createUser(probability)
    }, [probability, seed])

    const createUser = (withMistakes) => {
        if (seed == null || seed === '') faker.seed()
        else faker.seed(seed)
        let newUsers = generateUsers(20, ((seed + 100) * 100 || 0))
        if (withMistakes) {
            newUsers = createMistakes(probability || 0, newUsers, seed)
        }
        setUsers(newUsers)
    }

    const handleProbability = (value) => {
        setProbability(value === '' ? null : Number(value))
    }
    const handleSeedRandomize = () => {
        setSeed(Number(faker.random.numeric(2)))
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
        }, 1500);
    };

    return <Container>
        <ToolBar
            seed={seed}
            onCreateUser={createUser}
            onChangeSeed={handleSeedChange}
            onRandomizeSeed={handleSeedRandomize}
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


