import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

export default function Accordions({heading, components}) {
    return (
        <Accordion className='w-full focus:outline-none' allowZeroExpanded onChange={() => console.log('Hello world')}>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton className="p-2 rounded border-teal-600 border">
                        <div className='flex'>
                            <AccordionItemState>
                                {({ expanded }) => (expanded ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#101010"}}>
                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z">
                                </path>
                            </svg>) : (  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#101010"}}>
                                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z">
                                </path>
                            </svg>))}
                            </AccordionItemState>
                            <span className='mx-2'>{heading}</span>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='px-0 py-2'>
                  {components}
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion> 
    );
}