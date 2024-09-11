import React, {ReactElement} from 'react'
import styled from 'styled-components'
import {Name} from './Name'

interface AccordionProps {
    items: string[]
    title: string
}

const AccordionWrapper = styled.div`
    width: calc(100% - 28px);
    background-color: rgb(74, 153, 233);
    color: rgb(255, 255, 255);
    border-radius: 6px;
    padding-top: 6px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
`

const AccordionHeader = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: row; // TODO: Test removing this; incompatible with Firefox 64
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
`

const AccordionTitleCount = styled.span`
    border-radius: 100px;
    background-color: rgb(255, 255, 255);
    color: rgb(74, 153, 233);
    padding: 8px;
    margin-right: 8px;
`

const AccordionItemsWrapper = styled.div`
    background-color: rgb(255, 255, 255);
    width: 100%;
    margin-top: 6px;
    border-radius: 6px;
    color: rgb(0, 0, 0);
    min-height: 1px;
    max-height: 200px;
    overflow-y: scroll;
`

export const Accordion = (props: AccordionProps): ReactElement | null => {
    return (<AccordionWrapper>
        <AccordionHeader>
            <AccordionTitleCount>{props.items.length}</AccordionTitleCount>{props.title}
        </AccordionHeader>
        <AccordionItemsWrapper>
            {props.items.map((name) => <Name key={name}>{name}</Name>)}
        </AccordionItemsWrapper>
    </AccordionWrapper>)
}
