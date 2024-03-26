import {
  Card,
  // CardHeader,
  CardBody,
  CardFooter,
  // Typography,
  Button
} from '@material-tailwind/react';
import { Checkbox } from '@material-tailwind/react';
import { Select, Option } from '@material-tailwind/react';
// import { RadioGroup, hexToRgb, rgbToHex } from "@mui/material";
import { Textarea } from '@material-tailwind/react';
import { IconButton } from '@material-tailwind/react';

function CheckboxColors() {
  return (
    <div className='flex w-max gap-1'>
      <Checkbox color='blue' crossOrigin={undefined} />
      <Checkbox color='blue' crossOrigin={undefined} />
      <Checkbox color='blue' defaultChecked crossOrigin={undefined} />
      <Checkbox color='blue' crossOrigin={undefined} />
      <Checkbox color='blue' crossOrigin={undefined} />
      <Checkbox color='blue' crossOrigin={undefined} />
      <Checkbox color='blue' crossOrigin={undefined} />
    </div>
  );
}

function NeverEndCheckBox() {
  return <Checkbox label='Never' crossOrigin={undefined} />;
}

function EndOnCheckBox() {
  return <Checkbox label='On' crossOrigin={undefined} />;
}

function EndAfterCheckBox() {
  return <Checkbox label='After' crossOrigin={undefined} />;
}

function TextareaDefault() {
  return (
    <div className='w-96'>
      <Textarea label='Message' />
    </div>
  );
}

export function IconButtonRounded() {
  return (
    <div className='flex items-center gap-4'>
      <IconButton variant='text' className='rounded-full'>
        <i className='fas fa-heart' />
      </IconButton>
    </div>
  );
}

function SelectDefault() {
  return (
    <div className='w-72'>
      <Select label='Select Version'>
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
}

export function DefaultCard() {
  return (
    <Card className='' style={{ width: '90px', height: '30px' }}>
      {/* <CardHeader>
            Custom Recurrence
            </CardHeader> */}
      <CardBody>
        <div className='flex'>
          Repeat every
          <SelectDefault />
        </div>
        <div>
          Repeat on
          <CheckboxColors />
        </div>
        <div>
          Ends
          <div>
            <NeverEndCheckBox />
          </div>
          <div>
            <EndOnCheckBox />
          </div>
          <div>
            <EndAfterCheckBox />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className='mr-0'>
          <Button>Cancel</Button>
          <Button>Done</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function SimpleCard() {
  return (
    <Card className='mt-6' style={{ fontSize: '14px', width: '384px', height: '600px' }}>
      <div
        id='card-header'
        style={{
          width: '384px',
          height: '47.200px',
          boxSizing: 'border-box',
          borderColor: '238',
          borderStyle: 'solid',
          padding: '0px 24px 13px 24px'
        }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: '500' }}>Custom Recurrence</h2>
      </div>

      <div id='card-body' style={{ width: '384px', height: '500px' }}>
        <div id='repeat-block' className='flex flex-row' style={{ width: '336px', height: '52px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '0.2px',
              lineHeight: '20px',
              pointerEvents: 'auto'
            }}
          >
            Repeat every
          </h2>
          <TextareaDefault />
          <div className=''>
            <IconButtonRounded />
            <IconButtonRounded />
          </div>
          <SelectDefault />
        </div>

        <div id='repeat-on-block'>
          <h2>Repeat on</h2>
          <CheckboxColors />
        </div>

        <div id='radio-group'>
          <h2>Ends</h2>
          <div>
            <NeverEndCheckBox />
          </div>
          <div className='flex flex-row'>
            <EndOnCheckBox />
            <TextareaDefault />
          </div>
          <div className='flex flex-row'>
            <EndAfterCheckBox />
            <TextareaDefault />
            <TextareaDefault />
            <div className=''>
              <IconButtonRounded />
              <IconButtonRounded />
            </div>
          </div>
        </div>
      </div>

      <div id='card-footer'>
        <div className='flex flex-row'>
          <Button>Cancel</Button>
          <Button>Done</Button>
        </div>
      </div>
    </Card>
  );
}
