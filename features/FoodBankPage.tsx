import React from "react";
import FoodBank from "../components/FoodBank";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {Button, View} from "react-native";
import {IconButton} from "@material-ui/core";
import {StyleSheet, Text} from "react-native";


export default function FoodBankPage({ setPage }) {

    const POSTCODE = "UB56PB"
    const APIURL = "http://127.0.0.1:5000/"
    const queryClient = new QueryClient()


    function FetchFoodBanks(postcode) {

        const {isLoading, error, data} = useQuery('data', () =>
            fetch(APIURL + "findfoodbanks?postcode=" + postcode.postcode).then(res =>
                res.json()
            )
        )
        if (isLoading) return 'Loading...'
        if (error) return 'An error has occurred: ' + error.message
        return (data.map(e => createCard(e)))
    }


    const createCard = (json) => {
        return (<FoodBank
            imageurl="https://nfpsynergy.net/sites/default/files/styles/clientlogo/public/client-logos/Shelter%20charity%20logo.JPG?itok=2thcUPEc" {...json}/>)
    }


    return (<View>
            <View style={styles.container}>
                <IconButton>bruh 1</IconButton>
                <Text>bruh 1</Text>
                <IconButton>bruh 1</IconButton>
            </View>

            <QueryClientProvider client={queryClient}>
                <FetchFoodBanks postcode={POSTCODE}/>
            </QueryClientProvider>

        </View>

    );
}

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection : "row"
        }
    })



