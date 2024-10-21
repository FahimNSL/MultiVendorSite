/**
 *
 * EditProduct
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const EditProduct = props => {
  const {
    user,
    product,
    productChange,
    formErrors,
    brands,
    updateProduct,
    deleteProduct,
    activateProduct
  } = props;

  const handleSubmit = event => {
    event.preventDefault();

    if (user.role === ROLES.Admin) {
      updateProduct();
    } else {

      console.log("You don't have permission to save changes for this product.");
    }
  };


  const handleDelete = () => {

    if (user.role === ROLES.Admin) {
      deleteProduct(product._id);
    } else {
      console.log("You don't have permission to delete this product.");
    }
  };
  return (
    <div className='edit-product'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Product link </label>
        <Link to={`/product/${product.slug}`} className='default-link'>
          {product.slug}
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={product.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Product Sku'}
              value={product.sku}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Product Slug'}
              value={product.slug}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Product Description'}
              value={product.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>



          {/* <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={product.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col> */}


          {/* updated code */}

          <Col xs='12' lg='6'>

            {user.role === ROLES.Admin ? (
              <Input
                type={'number'}
                error={formErrors['quantity']}
                label={'Quantity'}
                name={'quantity'}
                decimals={false}
                placeholder={'Product Quantity'}
                value={product.quantity}
                onInputChange={(name, value) => {
                  productChange(name, value);
                }}
              />
            ) : (
              <Input
                type={'number'}
                label={'Quantity'}
                value={product.quantity}
                disabled={true}
              />
            )}
          </Col>


          {/* <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Product Price'}
              value={product.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col> */}


          {/* updated code */}

          <Col xs='12' lg='6'>
            {user.role === ROLES.Admin ? (
              <Input
                type={'number'}
                error={formErrors['price']}
                label={'Price'}
                name={'price'}
                min={1}
                placeholder={'Product Price'}
                value={product.price}
                onInputChange={(name, value) => {
                  productChange(name, value);
                }}
              />
            ) : (
              <Input
                type={'number'}
                label={'Price'}
                value={product.price}
                disabled={true}
              />
            )}
          </Col>



          {/* <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              multi={false}
              name={'taxable'}
              value={[product.taxable ? taxableSelect[0] : taxableSelect[1]]}
              options={taxableSelect}
              handleSelectChange={value => {
                productChange('taxable', value.value);
              }}
            />
          </Col> */}


          <Col xs='12' md='12'>

            {user.role === ROLES.Admin ? (
              <SelectOption
                error={formErrors['taxable']}
                label={'Taxable'}
                multi={false}
                name={'taxable'}
                value={[product.taxable ? taxableSelect[0] : taxableSelect[1]]}
                options={taxableSelect}
                handleSelectChange={value => {
                  productChange('taxable', value.value);
                }}
              />
            ) : (
              <SelectOption
                label={'Taxable'}
                value={product.taxable ? 'Yes' : 'No'}
                disabled={true}
              />
            )}
          </Col>




          {user.role === ROLES.Admin && (
            <Col xs='12' md='12'>
              <SelectOption
                error={formErrors['brand']}
                label={'Select Brand'}
                multi={false}
                value={product.brand}
                options={brands}
                handleSelectChange={value => {
                  productChange('brand', value);
                }}
              />
            </Col>
          )}

          {/* <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              id={`enable-product-${product._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={product?.isActive}
              toggleCheckboxChange={value => {
                productChange('isActive', value);
                activateProduct(product._id, value);
              }}
            />
          </Col> */}


          {/* updated part */}


          <Col xs='12' md='12' className='mt-3 mb-2'>

            {user.role === ROLES.Admin && (
              <Switch
                id={`enable-product-${product._id}`}
                name={'isActive'}
                label={'Active?'}
                checked={product?.isActive}
                toggleCheckboxChange={value => {
                  productChange('isActive', value);
                  activateProduct(product._id, value);
                }}
              />
            )}

          </Col>



        </Row>

        <div className='d-flex flex-column flex-md-row'>




          {user.role === ROLES.Admin && (
            <Button
              type='submit'
              text='Save'
              className='mb-3 mb-md-0 mr-0 mr-md-3'
              onClick={handleSubmit}
            />
          )}



          {/* <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteProduct(product._id)}
          /> */}


          {user.role === ROLES.Admin && (
            <Button
              variant='danger'
              text='Delete'
              onClick={handleDelete}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
