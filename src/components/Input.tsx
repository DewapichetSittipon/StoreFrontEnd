import { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Rule } from '../models';
import { FaRegEye, FaRegEyeSlash, FaSearch } from 'react-icons/fa';
import { ValidatePattern } from '../constants';
import regex from '../utils/regex';

interface Props {
  label?: string;
  type?: string;
  placeholder?: string;
  rule?: Rule;
  value?: string | number;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
  textEnd?: boolean;
  textCenter?: boolean;
  textSearch?: boolean;
  autoFocus?: boolean;
  variant?: string;
  mount?: boolean;
  maxlength?: number;
  onClick?: () => void;
}

export function Input(props: Props) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [value, setValue] = useState(props.value);
  const [eyeIsOpened, setEyeIsOpened] = useState(false);
  const [mounted, setMounted] = useState(false);

  document.addEventListener('onSubmitCustom', (data) => {
    const event = data as CustomEvent;

    if (event.detail.hasNameOnly) {
      if (props.name) {
        validate(value);
      }
    } else {
      validate(value);
    }
  });

  useEffect(() => {
    setValue(props.value);
    mounted ? validate(props.value) : setMounted(true);
  }, [props.value]);

  const getRequired = () => {
    if (props.rule?.required) {
      return <span className="text-danger">*</span>;
    }

    return null;
  };

  const validate = (value?: string | number) => {
    if (!checkRequired(value)) {
      return;
    }

    if (!checkMinLength(value)) {
      return;
    }

    if (!checkMaxLength(value)) {
      return;
    }

    if (!checkMinValue(value)) {
      return;
    }

    if (!checkMaxValue(value)) {
      return;
    }

    if (!checkPattern(value)) {
      return;
    }

    setErrorMessage('');
  };

  const checkRequired = (value?: string | number) => {
    if (props.rule?.required && value !== 0 && !value) {
      setErrorMessage('กรุณากรอกข้อมูล');

      return false;
    }

    return true;
  };

  const checkMinLength = (value?: string | number) => {
    if (props.rule?.minLength && value && value.toString().length < props.rule.minLength) {
      setErrorMessage(`กรุณระบุอย่างน้อย ${props.rule.minLength} ตัวอักษร`);

      return false;
    }

    return true;
  };

  const checkMaxLength = (value?: string | number) => {
    if (props.rule?.maxLength && value && value.toString().length > props.rule.maxLength) {
      setErrorMessage(`กรุณระบุไม่เกิน ${props.rule.maxLength} ตัวอักษร`);

      return false;
    }

    return true;
  };

  const checkMinValue = (value?: string | number) => {
    if (props.rule?.minValue && Number(value) < props.rule.minValue) {
      setErrorMessage(`กรุณระบุอย่างน้อย ${props.rule.minValue}`);

      return false;
    }

    return true;
  };

  const checkMaxValue = (value?: string | number) => {
    if (props.rule?.maxValue && Number(value) > props.rule.maxValue) {
      setErrorMessage(`กรุณระบุไม่เกิน ${props.rule.maxValue}`);

      return false;
    }

    return true;
  };

  const checkPattern = (value?: string | number) => {
    const rulePattern = props.rule?.pattern;

    if (rulePattern && value) {
      let patternType;
      let errorMessage;

      switch (rulePattern) {
        case ValidatePattern.EMAIL:
          patternType = regex.validateEmail;
          errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
          break;

        case ValidatePattern.PHONENUMBER:
          patternType = regex.validatePhone;
          errorMessage = 'รูปแบบหมายเลขโทรศัพท์สำหรับติดต่อไม่ถูกต้อง';
          break;

        case ValidatePattern.TAXNUMBER:
          patternType = regex.validateTaxNumber;
          errorMessage = 'รูปแบบเลขประจำตัวผู้เสียภาษีไม่ถูกต้อง';
          break;

        case ValidatePattern.NUMBER:
          patternType = regex.validateNumber;
          errorMessage = 'รูปแบบเลขไม่ถูกต้อง';
          break;

        case ValidatePattern.PERCENTAGE:
          patternType = regex.validateNumberPercentage;
          errorMessage = 'รูปแบบเลขไม่ถูกต้อง';
          break;

        default:
          return true;
      }

      if (!patternType(value.toString())) {
        setErrorMessage(errorMessage);
        return false;
      }
    }

    return true;
  };

  const getErrorMessage = useMemo(() => {
    if (errorMessage) {
      return (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      );
    }

    return null;
  }, [errorMessage]);

  const handlerOnChange = (event: HTMLInputElement) => {
    if (props.onChange) {
      props.onChange(event.value);
      validate(props.value);
    }

    setValue(event.value);

    validate(event.value);
  };

  const type = useMemo(() => {
    if (props.type === 'password') {
      if (eyeIsOpened) {
        return 'text';
      }

      return 'password';
    }

    return props.type;
  }, [props.type, eyeIsOpened]);

  const handlerOnClick = useCallback(() => {
    if (props.onClick) {
      props.onClick();
    }
  }, [props.onClick]);

  return (
    <Form.Group className={`w-100 ${props.className ?? ''} ${props.label ? 'mb-3' : ''}`}>
      {props.label ? <Form.Label className='m-0'>{props.label} {getRequired()}</Form.Label> : null}
      <InputGroup hasValidation>
        <Form.Control
          autoFocus={props.autoFocus}
          className={`
          ${getErrorMessage ? 'is-invalid' : ''} 
          ${props.textEnd ? 'text-end' : ''} 
          ${props.textCenter ? 'text-center' : ''}`}
          value={value ?? ''}
          type={type}
          placeholder={props.placeholder}
          onChange={(event) => handlerOnChange(event.target as HTMLInputElement)}
          disabled={props.disabled}
          autoComplete="off"
          maxLength={props.maxlength}
          name={props.name}
        />
        {props.type === 'password' ? <EyeButton onChange={(value) => setEyeIsOpened(value)} /> : null}
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
        {props.textSearch
          && (
            <Button variant={`${props.variant ? props.variant : 'outline-primary'}`} onClick={() => handlerOnClick()}>
              <FaSearch />
            </Button>
          )}
      </InputGroup>
    </Form.Group>
  );
}

function EyeButton(props: { onChange: (value: boolean) => void }) {
  const [eyeIsOpened, setEyeIsOpened] = useState(false);

  const icon = useMemo(() => (eyeIsOpened ? <FaRegEye /> : <FaRegEyeSlash />), [eyeIsOpened]);

  const handlerOnClick = useCallback(() => {
    setEyeIsOpened(!eyeIsOpened);

    props.onChange(!eyeIsOpened);
  }, [eyeIsOpened]);

  return (
    <InputGroup.Text onClick={handlerOnClick} className="cursor-pointer">
      {icon}
    </InputGroup.Text>
  );
}