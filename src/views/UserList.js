import React, { useContext } from "react";
import { Alert, FlatList, View } from 'react-native';
import { Avatar, Button, Icon, ListItem } from "@rneui/themed";
import UsersContext from "../context/UsersContext";


export default props => {
    const { state, dispatch } = useContext(UsersContext)

    useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja Excluir Usuário ?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                bottomDivider
                key={user.id}
                onPress={() => props.navigation.navigate("UserForm", user)}
            >
                <Avatar source={{ uri: user.avatarUrl }}
                    rounded />
                <ListItem.Content >
                    <ListItem.Title>
                        {user.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {user.email}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => props.navigation.navigate("UserForm", user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />} />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />} />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}
