import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useActionData, useSubmit } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

export interface CancelReservationFormData extends FieldValues {
  email: string;
  bookingNumber: string;
}

const CancelReservationPage: React.FC = () => {
  const submit = useSubmit();
  const error = useActionData() as string | null;

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<CancelReservationFormData>();

const onSubmit: SubmitHandler<CancelReservationFormData> = (values) =>
    submit(values, { method: 'post', action: '/reservation/cancel' });