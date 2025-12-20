import type { EstimateLESchemaType } from "../../core/schemas";
import { routes } from "../../pages";
import React from "react";
import { NavLink } from "react-router-dom";


interface EstimateCardProps {
  className?: string;
  estimate: EstimateLESchemaType;
}

const EstimateCardC = ({ className, estimate }: EstimateCardProps) => {
  const { title, updatedAt } = estimate;

  return (
    <div className={className}>
      <h3>
        <NavLink to={routes.getEstimatePage(String(estimate.id))}>{title}</NavLink>
      </h3>
      <p>{updatedAt.toLocaleDateString()}</p>
    </div>
  );
};

export const EstimateCard = React.memo(EstimateCardC) as typeof EstimateCardC;
