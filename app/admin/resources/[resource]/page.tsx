'use client';
import { Fragment, useReducer } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import List from 'components/resources/List';
//import { Form } from 'pages/resources/Form';@
//import { resources } from 'resources';
import { resources } from 'resources';
import { Form } from 'components/resources/Form';

type ResourcesState =
    | { name: string, view: 'list', rowId: null }
    | { name: string, view: 'form', rowId: string | null | undefined };

const defaultState: ResourcesState = {
    name: 'events',
    view: 'list',
    rowId: null,
};

type ResourcesAction =
    | { type: 'setName', name: string }
    | { type: 'showList' }
    | { type: 'showForm', rowId?: string | null };

export default function Resource({ params }: { params: { resource: string } }) {
    const resourceName = params.resource || '';

    const [state, dispatch] = useReducer((state: ResourcesState, action: ResourcesAction): ResourcesState => {
        switch (action.type) {
            case 'setName':
                return {
                    ...state,
                    rowId: null,
                    view: 'list',
                    name: action.name,
                };
            case 'showList':
                return {
                    ...state,
                    view: 'list',
                    rowId: null,
                };
            case 'showForm':
                return {
                    ...state,
                    view: 'form',
                    rowId: action.rowId,
                };
            default:
                return { ...state };
        }
    }, defaultState);

    if (resourceName && state.name !== resourceName) {
        dispatch({ type: 'setName', name: resourceName });
    }
    //console.log(resources);
    const config: any = resources.find(r => r.resource === resourceName);
    //if (!config) {
    //throw new Error('Missing resource configuration.');
    //}

    //const List = (props: any) => <div>list</div>;

    return (
        <div>
            {state.view === 'list' &&
                <div>
                    <Stack direction="row" justifyContent="space-between">
                        <Box mb={2}>
                            <Typography variant="h4" component="div">
                                {config?.name} list
                            </Typography>
                        </Box>
                    </Stack>
                    <List resource={state} dispatch={dispatch} />
                </div>}
            {state.view === 'form' && <Form resource={state} dispatch={dispatch} />}
        </div>
    );
};

export type { ResourcesState, ResourcesAction };

