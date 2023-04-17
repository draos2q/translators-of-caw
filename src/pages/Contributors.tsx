import { Avatar, Heading, Spacer, Stack, Tooltip, Link, Container } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { Link as RouterLink } from "react-router-dom";
import Blockies from 'react-blockies';


import { useContributorsStore } from "src/store/ContributorStore";

const list = {
    visible: {
        opacity: 1,
        transition: {
            // delayChildren: 1.5,
            staggerChildren: 0.01,
        },
    },
    hidden: {
        opacity: 0,
    },
};

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
};


export default function Contributors() {

    const { contributors } = useContributorsStore();    

    return (
        <Container maxW={"3xl"}>
            <Stack
                spacing={4}
                mb={8}
                align={'center'}
            >
                <Spacer h="2xs" />
                <Heading
                    as="h1"
                    size={'2xl'}
                >
                    Already {contributors.length} awesome contributors!
                </Heading>
                <motion.ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginLeft: '0px',
                        marginBottom: '8px',
                        marginTop: '15px',
                        paddingLeft: '0px',
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={list}
                >
                    {contributors.map((person) => (
                        <motion.li
                            style={{
                                listStyle: 'none',
                                marginRight: '-10px',
                            }}
                            key={person.id}
                            data-testid={person.id}
                            variants={item}
                            whileHover={{
                                zoom: 1.5,
                                zIndex: 1,
                                transition: { ease: 'easeOut' },
                            }}
                        >
                            <div
                                style={{
                                    background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                                    height: '50px',
                                    width: '50px',
                                    borderRadius: '50%',
                                    border: '3px solid #4C79DF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '38px',
                                }}
                            >
                                <Tooltip
                                    label={person.name}
                                    aria-label={person.name}
                                >
                                    <Link
                                        isExternal
                                        as={RouterLink}
                                        to={person.profile}
                                        padding={0}
                                        margin={0}
                                        textDecoration="none"
                                    >
                                        {person.avatar ?
                                            <Avatar
                                                p={1}
                                                m={1}
                                                src={person.avatar}
                                            />
                                            :
                                            <Blockies
                                                seed={person.name}
                                                scale={5}
                                                size={8}
                                                className="rounded-full"
                                            />
                                        }
                                    </Link>
                                </Tooltip>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>              
            </Stack>
        </Container>
    );
}