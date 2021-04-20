import React from 'react';
import {AppProvider, Avatar, TextStyle, Card, Page, ResourceList} from '@shopify/polaris';

export default function ProductForm(props) {
    return (
        <AppProvider
            i18n={{
                Polaris: {
                    ResourceList: {
                        defaultItemPlural: 'products',
                        showing: 'Showing {itemsCount} {resource}',
                        Item: {
                            viewItem: 'View details for {itemName}',
                        },
                    },
                    Common: {
                        checkbox: 'checkbox',
                    },
                },
            }}
        >
            {props.children}
        </AppProvider>
    )
}