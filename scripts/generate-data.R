#!/usr/bin/Rscript

fmlas <- c(~0 + infection_history, ~0 + last_vax_type)
delta_dat <- data.table::fread(system.file("delta_full.rds", package = "epikinetics"))

generate_data <- function(fmla) {
  mod <- epikinetics::scova$new(data = delta_dat, covariate_formula = fmla)
  mod$fit()
  res <- mod$simulate_population_trajectories()
  jsonlite::write_json(res, paste("data/biomarker/legacy", all.vars(fmla), "pop_fits.json", sep = "/"))
}

lapply(fmlas, generate_data)
